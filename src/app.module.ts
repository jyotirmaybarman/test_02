import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { TestConsumer } from './test-queue.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      }
    }),
    BullModule.registerQueue({
      name: 'test'
    })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, TestConsumer],
})
export class AppModule {}
