import { Controller, Get, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('bulk')
  async sendBulkMail(@Query('qty') qty: string) {
    return await this.mailService.sendBulkMail(qty);
  }

  @Get('queue-status')
  async getMailQueueStatus() {
    return await this.mailService.mailQueueStatus();
  }
}
