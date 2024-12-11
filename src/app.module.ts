import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RepositoryModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadModels: true,
          synchronize: true,
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
    RepositoryModule,
    UsersModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    AuthModule,
    JwtModule,
  ],
})
export class AppModule {}
