"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mail_queue_entity_1 = require("./entities/mail-queue.entity");
let MailService = class MailService {
    constructor(mailQueue, mailQueueRepository) {
        this.mailQueue = mailQueue;
        this.mailQueueRepository = mailQueueRepository;
    }
    async sendBulkMail(qty) {
        try {
            const { id } = await this.mailQueue.add('mail', { mailQuantity: qty });
            await this.mailQueueRepository.save({
                id: Number(id),
                mail_qty: Number(qty),
            });
            return { jobId: id };
        }
        catch (err) {
            console.log('Error queueing bulk mail.');
            return undefined;
        }
    }
    async mailQueueStatus() {
        const mails = { pending: 0, active: 0, completed: 0 };
        const jobs = { pending: [], active: [], completed: [] };
        jobs.pending = await this.mailQueueRepository.findAndCount({
            where: { status: 'pending' },
        });
        jobs.active = await this.mailQueueRepository.findAndCount({
            where: { status: 'active' },
        });
        jobs.completed = await this.mailQueueRepository.findAndCount({
            where: { status: 'completed' },
        });
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
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('mail-queue')),
    __param(1, (0, typeorm_1.InjectRepository)(mail_queue_entity_1.MailQueue)),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map