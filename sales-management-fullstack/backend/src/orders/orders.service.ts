import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async findMyOrders(userId: number) {

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user?.customerId) {
      return [];
    }

    return this.prisma.order.findMany({
      where: {
        customerId: user.customerId,
      },

      include: {
        customer: true,
        user: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async create(userId: number, dto: CreateOrderDto) {
    let total = 0;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let customerId: number;

    // Admin được chọn khách hàng
    if (user.role === 'ADMIN') {
      if (!dto.customerId) {
        throw new BadRequestException('Vui lòng chọn khách hàng');
      }

      customerId = dto.customerId;
    }

    // Customer chỉ tạo đơn của mình
    else {
      if (!user.customerId) {
        throw new BadRequestException('User chưa liên kết Customer');
      }

      customerId = user.customerId;
    }

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const orderItems: {
      productId: number;
      quantity: number;
      price: number;
    }[] = [];

    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      total += product.price * item.quantity;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    return this.prisma.order.create({
      data: {
        customerId,
        userId: user.id,
        total,
        status: 'PENDING',

        items: {
          create: orderItems,
        },
      },

      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }
  async findAll() {
    return this.prisma.order.findMany({
      include: {
        customer: true,
        user: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.order.findUnique({
      where: {
        id,
      },

      include: {
        customer: true,
        user: true,

        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async update(userId: number, id: number, dto: UpdateOrderDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let order;

    //Admin được sửa mọi đơn
    if (user.role === 'ADMIN') {
      order = await this.prisma.order.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });
    }

    // customer chỉ sửa được đơn của chính mình
    else {
      if (!user.customerId) {
        throw new Error('User chuea liên kết với customer');
      }
      order = await this.prisma.order.findFirst({
        where: {
          id,
          customerId: user.customerId,
        },
        include: {
          items: true,
        },
      });
    }

    if (!order) {
      throw new Error('Order not found');
    }

    // cập nhật OrderItem
    if (dto.productId != null || dto.quantity != null) {
      let productPrice = order.items[0].price;

      if (dto.productId != null) {
        const product = await this.prisma.product.findUnique({
          where: {
            id: dto.productId,
          },
        });

        if (!product) {
          throw new Error('Product not found');
        }

        productPrice = product.price;
      }
      await this.prisma.orderItem.update({
        where: {
          id: order.items[0].id,
        },

        data: {
          ...(dto.productId != null && {
            productId: dto.productId,
          }),

          ...(dto.quantity && {
            quantity: dto.quantity,
          }),
          price: productPrice,
        },
      });

      //Lấy lại tất cả item sau khi cập nhật
      const items = await this.prisma.orderItem.findMany({
        where: {
          orderId: id,
        },
        include: {
          product: true,
        },
      });

      //Tính lại tổng tiền
      const total = items.reduce((sum, item) => {
        return sum + Number(item.price) * item.quantity;
      }, 0);

      //cập nhật total của Order
      await this.prisma.order.update({
        where: { id },
        data: {
          total,
        },
      });
    }

    // Chỉ Admin mới được đổi status và customer
    const updateData: any = {};

    if (user.role === 'ADMIN') {
      if (dto.status != null) {
        updateData.status = dto.status;
      }

      if (dto.customerId != null) {
        updateData.customer = {
          connect: {
            id: dto.customerId,
          },
        };
      }
    }

    return await this.prisma.order.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        customer: true,
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async remove(userId: number, id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let order;

    // Admin được xóa mọi đơn
    if (user.role === 'ADMIN') {
      order = await this.prisma.order.findUnique({
        where: {
          id,
        },
      });
    }

    // Customer chỉ xóa đơn của mình
    else {
      if (!user.customerId) {
        throw new Error('User chưa liên kết Customer');
      }

      order = await this.prisma.order.findFirst({
        where: {
          id,
          customerId: user.customerId,
        },
      });
    }

    if (!order) {
      throw new Error('Bạn không có quyền xóa đơn này');
    }

    await this.prisma.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}