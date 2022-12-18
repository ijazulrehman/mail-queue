import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { MailQueue } from './entities/mail-queue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Processor('mail-queue')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(MailQueue)
    private readonly mailQueueRepository: Repository<MailQueue>,
  ) {}

  @OnQueueActive()
  async onActive(job: Job) {
    await this.mailQueueRepository.update(
      { id: Number(job.id) },
      { status: 'active' },
    );
    console.log(
      `@OnQueueActive - Processing job ${job.id} of type ${
        job.name
      }. Data: ${JSON.stringify(job.data)}`,
    );
  }

  @OnQueueCompleted()
  async onComplete(job: Job) {
    await this.mailQueueRepository.update(
      { id: Number(job.id) },
      { status: 'completed' },
    );
    console.log(
      `@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`,
      `Data: ${JSON.stringify(job.data)} Delivered`,
    );
  }

  @OnQueueFailed()
  async onError(job: Job<any>, error) {
    await this.mailQueueRepository.update(
      { id: Number(job.id) },
      { status: 'failed' },
    );
    console.log(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('mail')
  async sendingEmail(job: Job): Promise<boolean> {
    await this.wait(8); // wait for 8sec until mails get delivered
    return true;
  }

  async wait(seconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }
}
