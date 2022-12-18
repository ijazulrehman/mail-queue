import { Job } from "bull";
export declare class MessageConsumer {
    readOperationJob(job: Job<unknown>): void;
}
