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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailQueue = void 0;
const typeorm_1 = require("typeorm");
let MailQueue = class MailQueue {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({
        type: 'bigint',
        name: 'id',
    }),
    __metadata("design:type", Number)
], MailQueue.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'bigint',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], MailQueue.prototype, "mail_qty", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        default: 'pending',
    }),
    __metadata("design:type", String)
], MailQueue.prototype, "status", void 0);
MailQueue = __decorate([
    (0, typeorm_1.Entity)('mail_queue', { schema: 'public' })
], MailQueue);
exports.MailQueue = MailQueue;
//# sourceMappingURL=mail-queue.entity.js.map