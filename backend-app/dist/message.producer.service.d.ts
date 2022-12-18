import { Queue } from 'bull';
export declare class MessageProducerService {
    private queue;
    constructor(queue: Queue);
    sendMessage(message: string): Promise<void>;
}
