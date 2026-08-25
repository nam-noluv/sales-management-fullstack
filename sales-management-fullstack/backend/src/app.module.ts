import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ProductsModule, AuthModule, CustomersModule, OrdersModule, DashboardModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }