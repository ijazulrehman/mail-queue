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
exports.MessageProducerService = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let MessageProducerService = class MessageProducerService {
    constructor(queue) {
        this.queue = queue;
    }
    async sendMessage(message) {
        await this.queue.add('message-job', {
            text: message
        });
    }
};
MessageProducerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('message-queue')),
    __metadata("design:paramtypes", [Object])
], MessageProducerService);
exports.MessageProducerService = MessageProducerService;
//# sourceMappingURL=message.producer.service.js.map