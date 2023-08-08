import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketGateway } from './socket/socket.gateway';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Server } from 'socket.io';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),MongooseModule.forRoot(
    process.env.URI,
  ),UserModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway, Server],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('m' )
  }
}