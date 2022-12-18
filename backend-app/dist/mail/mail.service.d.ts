import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { MailQueue } from './entities/mail-queue.entity';
export declare class MailService {
    private mailQueue;
    private readonly mailQueueRepository;
    constructor(mailQueue: Queue, mailQueueRepository: Repository<MailQueue>);
    sendBulkMail(qty: string): Promise<{
        jobId: import("bull").JobId;
    }>;
    mailQueueStatus(): Promise<{
        pending: {
            jobs: any;
            mail: number;
        };
        active: {
            jobs: any;
            mail: number;
        };
        completed: {
            jobs: any;
            mail: number;
        };
    }>;
}
