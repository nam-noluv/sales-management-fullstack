import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

interface CurrentUser {
  id: number;
  role: string;
}

interface FindAllQuery {
  page?: number;
  limit?: number;
  categoryId?: number;
  search?: string;
  mine?: boolean; // true -> chỉ lấy sản phẩm của chính seller đang gọi
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const products = await this.prisma.product.findMany();

    const totalProducts = products.length;
    const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
    const totalValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );

    return { totalProducts, totalQuantity, totalValue };
  }

  async findAll(query: FindAllQuery, user?: CurrentUser) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(query.limit) || 12));

    const where: any = {};

    if (query.categoryId) {
      where.categoryId = Number(query.categoryId);
    }

    if (query.search) {
      where.name = { contains: query.search };
    }

    // "mine=true" -> chỉ trả về sản phẩm của chính seller đang đăng nhập
    if (query.mine && user) {
      where.sellerId = user.id;
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  create(data: CreateProductDto, user: CurrentUser): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...data,
        // ADMIN tạo hộ -> không gán sellerId (coi như sản phẩm của cửa hàng chính)
        // SELLER tạo -> tự động gán sản phẩm này thuộc về chính họ
        sellerId: user.role === 'SELLER' ? user.id : null,
      },
    });
  }

  async update(
    id: number,
    data: UpdateProductDto,
    user: CurrentUser,
  ): Promise<Product> {
    await this.assertOwnership(id, user);
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, user: CurrentUser): Promise<Product> {
    await this.assertOwnership(id, user);
    return this.prisma.product.delete({
      where: { id },
    });
  }

  // Kiểm tra: nếu là SELLER thì chỉ được sửa/xoá sản phẩm CỦA CHÍNH MÌNH.
  // ADMIN thì luôn được phép, không cần kiểm tra.
  private async assertOwnership(id: number, user: CurrentUser) {
    if (user.role === 'ADMIN') return;

    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Sản phẩm không tồn tại');
    }
    if (product.sellerId !== user.id) {
      throw new ForbiddenException('Bạn không có quyền sửa sản phẩm này');
    }
  }
}
