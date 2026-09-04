import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalProducts = await this.prisma.product.count();

    const totalCustomers = await this.prisma.customer.count();

    const totalOrders = await this.prisma.order.count();

    const totalQuantity = await this.prisma.product.aggregate({
      _sum: {
        quantity: true,
      },
    });

    const revenue = await this.prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    // ĐƠN HÀNG GẦN ĐÂY
    const recentOrders = await this.prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
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

    return {
      totalProducts,

      totalCustomers,

      totalOrders,

      totalQuantity: totalQuantity._sum.quantity || 0,

      revenue: revenue._sum.total || 0,

      recentOrders,
    };
  }
}
