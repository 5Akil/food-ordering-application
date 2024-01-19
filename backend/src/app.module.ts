import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Authentication/auth.module';
import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Menu_Items_Module } from './Menu_Items/menu_items.module';
import { CategoriesModule } from './Categories/categories.module';
import { CheckoutModule } from './Checkout/checkout.module';
import { AuthMiddleware } from './Middleware/auth.middleware';
import { UserController } from './User/controller/user.controller';
import { CategoriesController } from './Categories/Controller/categories.controller';
import { Menu_Item_Controller } from './Menu_Items/controller/menu_items.controller';
import { CheckoutController } from './Checkout/controller/checkout.controller';
import { OrderModule } from './Orders/order.module';
import { OrderController } from './Orders/controller/orders.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UserModule,
    Menu_Items_Module,
    CategoriesModule,
    CheckoutModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UserController , CategoriesController , Menu_Item_Controller , CheckoutController ,OrderController);
  }
}

