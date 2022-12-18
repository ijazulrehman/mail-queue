"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const mail_controller_1 = require("./mail.controller");
const bull_1 = require("@nestjs/bull");
const mail_processor_1 = require("./mail.processor");
const typeorm_1 = require("@nestjs/typeorm");
const mail_queue_entity_1 = require("./entities/mail-queue.entity");
const config_1 = require("@nestjs/config");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([mail_queue_entity_1.MailQueue]),
            bull_1.BullModule.registerQueueAsync({
                name: 'mail-queue',
                useFactory: async (configService) => ({
                    redis: {
                        host: configService.get('REDIS_HOST'),
                        port: configService.get('REDIS_PORT'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [mail_controller_1.MailController],
        providers: [mail_service_1.MailService, mail_processor_1.MailProcessor],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map