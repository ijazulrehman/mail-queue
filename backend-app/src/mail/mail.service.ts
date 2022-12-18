import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailQueue } from './entities/mail-queue.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('mail-queue') private mailQueue: Queue,
    @InjectRepository(MailQueue)
    private readonly mailQueueRepository: Repository<MailQueue>,
  ) {}

  async sendBulkMail(qty: string) {
    try {
      const { id } = await this.mailQueue.add('mail', { mailQuantity: qty });
      await this.mailQueueRepository.save({
        id: Number(id),
        mail_qty: Number(qty),
      });
      return { jobId: id };
    } catch (err) {
      console.log('Error queueing bulk mail.');
      return undefined;
    }
  }

  async mailQueueStatus() {
    const mails = { pending: 0, active: 0, completed: 0 };
    const jobs = { pending: [], active: [], completed: [] };

    //jobs status
    jobs.pending = await this.mailQueueRepository.findAndCount({
      where: { status: 'pending' },
    });
    jobs.active = await this.mailQueueRepository.findAndCount({
      where: { status: 'active' },
    });
    jobs.completed = await this.mailQueueRepository.findAndCount({
      where: { status: 'completed' },
    });

    //mail status
    jobs.pending[0].map((job) => {
      return (mails.pending += Number(job.mail_qty));
    });
    jobs.active[0].map((job) => {
      return (mails.active += Number(job.mail_qty));
    });
    jobs.completed[0].map((job) => {
      return (mails.completed += Number(job.mail_qty));
    });

    return {
      pending: {
        jobs: jobs.pending[1],
        mail: mails.pending,
      },
      active: {
        jobs: jobs.active[1],
        mail: mails.active,
      },
      completed: {
        jobs: jobs.completed[1],
        mail: mails.completed,
      },
    };
  }
}
