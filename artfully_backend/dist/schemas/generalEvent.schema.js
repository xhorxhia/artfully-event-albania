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
exports.GeneralEventSchema = exports.GeneralEvent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const comment_schema_1 = require("./comment.schema");
let GeneralEvent = class GeneralEvent {
};
exports.GeneralEvent = GeneralEvent;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GeneralEvent.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GeneralEvent.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GeneralEvent.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GeneralEvent.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [comment_schema_1.CommentSchema] }),
    __metadata("design:type", Array)
], GeneralEvent.prototype, "comments", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GeneralEvent.prototype, "imageFile", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], GeneralEvent.prototype, "imagesArray", void 0);
exports.GeneralEvent = GeneralEvent = __decorate([
    (0, mongoose_1.Schema)()
], GeneralEvent);
exports.GeneralEventSchema = mongoose_1.SchemaFactory.createForClass(GeneralEvent);
//# sourceMappingURL=generalEvent.schema.js.map