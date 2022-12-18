import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './mail.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailQueue } from './entities/mail-queue.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forFeature([MailQueue]),
    BullModule.registerQueueAsync({
      name: 'mail-queue',
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService, MailProcessor],
})
export class MailModule {}
