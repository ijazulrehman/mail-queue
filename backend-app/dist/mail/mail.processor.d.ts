import { Job } from 'bull';
import { MailQueue } from './entities/mail-queue.entity';
import { Repository } from 'typeorm';
export declare class MailProcessor {
    private readonly mailQueueRepository;
    private readonly logger;
    constructor(mailQueueRepository: Repository<MailQueue>);
    onActive(job: Job): Promise<void>;
    onComplete(job: Job): Promise<void>;
    onError(job: Job<any>, error: any): Promise<void>;
    sendingEmail(job: Job): Promise<boolean>;
    wait(seconds: any): Promise<unknown>;
}
