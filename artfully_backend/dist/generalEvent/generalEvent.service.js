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
exports.GeneralEventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const generalEvent_schema_1 = require("../schemas/generalEvent.schema");
let GeneralEventService = class GeneralEventService {
    constructor(eventModel) {
        this.eventModel = eventModel;
        this.events = [];
    }
    async create(event) {
        const newProduct = new this.eventModel(event);
        return newProduct.save();
    }
    async findAll() {
        return await this.eventModel.find().exec();
    }
    async readById(id) {
        return await this.eventModel.findById(id).exec();
    }
    async update(id, Event) {
        return await this.eventModel.findByIdAndUpdate(id, Event, { new: true });
    }
    async delete(id) {
        return await this.eventModel.findByIdAndRemove(id);
    }
    async findByTypeAndCategory(type, category) {
        return this.eventModel.find({ type, category }).exec();
    }
    async deleteComment(eventId, commentId) {
        const generalEvent = await this.eventModel.findById(eventId);
        const comments = generalEvent.comments;
        const commentIndex = generalEvent.comments.findIndex((comment) => comment._id.toString() == commentId);
        if (commentIndex === -1) {
            return { error: 'Comment not found' };
        }
        comments.splice(commentIndex, 1);
        await generalEvent.save();
    }
    async addComment(eventId, comment) {
        const generalEvent = await this.eventModel.findById(eventId);
        const comments = generalEvent.comments;
        comments.push(comment);
        await generalEvent.save();
    }
};
exports.GeneralEventService = GeneralEventService;
exports.GeneralEventService = GeneralEventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(generalEvent_schema_1.GeneralEvent.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], GeneralEventService);
//# sourceMappingURL=generalEvent.service.js.map