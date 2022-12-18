/// <reference types="bull" />
import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendBulkMail(qty: string): Promise<{
        jobId: import("bull").JobId;
    }>;
    getMailQueueStatus(): Promise<{
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
