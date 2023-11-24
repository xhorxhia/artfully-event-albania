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
exports.GeneralEventController = void 0;
const common_1 = require("@nestjs/common");
const generalEvent_schema_1 = require("../schemas/generalEvent.schema");
const generalEvent_dto_1 = require("./generalEvent.dto");
const generalEvent_service_1 = require("./generalEvent.service");
let GeneralEventController = class GeneralEventController {
    constructor(generalEventService) {
        this.generalEventService = generalEventService;
    }
    async createProduct(response, event) {
        const newEvent = await this.generalEventService.create(event);
        return response.status(common_1.HttpStatus.CREATED).json({
            newEvent
        });
    }
    async fetchAll(response) {
        const events = await this.generalEventService.findAll();
        return response.status(common_1.HttpStatus.OK).json({
            events
        });
    }
    async findById(response, id) {
        const event = await this.generalEventService.readById(id);
        return response.status(common_1.HttpStatus.OK).json({
            event
        });
    }
    async findBytypeAndCategory(response, type, category) {
        const event = await this.generalEventService.findByTypeAndCategory(type, category);
        return response.status(common_1.HttpStatus.OK).json({
            event
        });
    }
    async update(response, id, event) {
        const updatedEvent = await this.generalEventService.update(id, event);
        return response.status(common_1.HttpStatus.OK).json({
            updatedEvent
        });
    }
    async delete(response, id) {
        const deletedEvent = await this.generalEventService.delete(id);
        return response.status(common_1.HttpStatus.OK).json({
            deletedEvent
        });
    }
    async deleteComment(response, eventId, commentId) {
        const deletedComment = this.generalEventService.deleteComment(eventId, commentId);
        return response.status(common_1.HttpStatus.OK).json({
            deletedComment
        });
    }
    async addComment(response, eventId, comment) {
        const comments = this.generalEventService.addComment(eventId, comment);
        return response.status(common_1.HttpStatus.OK).json({
            comments
        });
    }
};
exports.GeneralEventController = GeneralEventController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, generalEvent_dto_1.GeneralEventDto]),
    __metadata("design:returntype", Promise)
], GeneralEventController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralEventController.prototype, "fetchAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralEventController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':type/:category'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralEventController.prototype, "findBytypeAndCategory", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, generalEvent_schema_1.GeneralEvent]),
    __metadata("design:returntype", Promise)
], GeneralEventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralEventController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)(':eventId/comments/:commentId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Param)('commentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralEventController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Post)(':eventId/addComments'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('eventId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralEventController.prototype, "addComment", null);
exports.GeneralEventController = GeneralEventController = __decorate([
    (0, common_1.Controller)('generalEvent/'),
    __metadata("design:paramtypes", [generalEvent_service_1.GeneralEventService])
], GeneralEventController);
//# sourceMappingURL=generalEvent.controller.js.map