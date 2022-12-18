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
exports.MailProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const mail_queue_entity_1 = require("./entities/mail-queue.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MailProcessor = class MailProcessor {
    constructor(mailQueueRepository) {
        this.mailQueueRepository = mailQueueRepository;
        this.logger = new common_1.Logger(this.constructor.name);
    }
    async onActive(job) {
        await this.mailQueueRepository.update({ id: Number(job.id) }, { status: 'active' });
        console.log(`@OnQueueActive - Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
    }
    async onComplete(job) {
        await this.mailQueueRepository.update({ id: Number(job.id) }, { status: 'completed' });
        console.log(`@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`, `Data: ${JSON.stringify(job.data)} Delivered`);
    }
    async onError(job, error) {
        await this.mailQueueRepository.update({ id: Number(job.id) }, { status: 'failed' });
        console.log(`Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    }
    async sendingEmail(job) {
        await this.wait(8);
        return true;
    }
    async wait(seconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, seconds * 1000);
        });
    }
};
__decorate([
    (0, bull_1.OnQueueActive)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "onActive", null);
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "onComplete", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "onError", null);
__decorate([
    (0, bull_1.Process)('mail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "sendingEmail", null);
MailProcessor = __decorate([
    (0, bull_1.Processor)('mail-queue'),
    __param(0, (0, typeorm_1.InjectRepository)(mail_queue_entity_1.MailQueue)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MailProcessor);
exports.MailProcessor = MailProcessor;
//# sourceMappingURL=mail.processor.js.map