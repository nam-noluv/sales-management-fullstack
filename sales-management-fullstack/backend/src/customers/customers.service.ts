import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  findOne(id: number) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async remove(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const orders = await tx.order.findMany({
        where: { customerId: id },
        select: { id: true },
      });

      const orderIds = orders.map((o) => o.id);

      if (orderIds.length > 0) {
        await tx.orderItem.deleteMany({
          where: {
            orderId: {
              in: orderIds,
            },
          },
        });

        await tx.order.deleteMany({
          where: {
            customerId: id,
          },
        });
      }

      await tx.user.updateMany({
        where: {
          customerId: id,
        },
        data: {
          customerId: null,
        },
      });

      return tx.customer.delete({
        where: {
          id,
        },
      });
    });
  }
}
