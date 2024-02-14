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
const mongoose = require("mongoose");
const mongodb_1 = require("mongodb");
let GeneralEventService = class GeneralEventService {
    constructor(eventModel, connection) {
        this.eventModel = eventModel;
        this.connection = connection;
        this.events = [];
        this.connectToMongoDB();
    }
    async connectToMongoDB() {
        try {
            this.client = new mongodb_1.MongoClient('mongodb://localhost:27017/?useNewUrlParser=true&useUnifiedTopology=true');
            await this.client.connect();
            this.db = this.client.db('artfullyEvents');
            this.bucket = new mongodb_1.GridFSBucket(this.db);
            console.log('MongoDB connected successfully');
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
    async create(event, imagesArray) {
        console.log("array", imagesArray);
        const eventImagesArray = imagesArray['eventImages[]'] || imagesArray['eventImages'];
        const imageUrl = await this.uploadImage(imagesArray["image"][0]);
        let imgsUrls = [];
        if (eventImagesArray?.length > 0) {
            imgsUrls = await Promise.all(eventImagesArray.map(img => this.uploadImage(img)));
        }
        const newEvent = new this.eventModel({
            ...event,
            imageFile: imageUrl,
            imagesArray: imgsUrls
        });
        return newEvent.save();
    }
    async uploadImage(image) {
        if (!this.bucket) {
            console.error('GridFSBucket not initialized.');
            return '';
        }
        try {
            const uploadStream = this.bucket.openUploadStream(image?.originalname);
            const fileStream = require('fs').createReadStream(image?.path);
            fileStream.pipe(uploadStream);
            return new Promise((resolve, reject) => {
                uploadStream.on('finish', () => {
                    console.log('File upload finished.');
                    resolve(uploadStream.id.toString());
                });
                uploadStream.on('error', (error) => {
                    console.error('File upload error:', error);
                    reject(error);
                });
                fileStream.on('error', (error) => {
                    console.error('File read stream error:', error);
                    reject(error);
                });
            });
        }
        catch (error) {
            console.error('Error during file upload:', error);
            throw error;
        }
    }
    async getFileStreamById(id) {
        if (!this.bucket) {
            console.error('GridFSBucket not initialized.');
            return null;
        }
        const downloadStream = this.bucket.openDownloadStream(new mongoose.Types.ObjectId(id));
        return downloadStream;
    }
    async findAll() {
        return await this.eventModel.find().exec();
    }
    async readById(id) {
        return await this.eventModel.findById(id).exec();
    }
    async update(id, event, imagesArray) {
        console.log(imagesArray['eventImages[]']?.length, "array", imagesArray.length);
        const eventToUpdate = this.eventModel.findById(id).exec();
        if (!eventToUpdate) {
            throw new common_1.NotFoundException('Event not found');
        }
        let profileImageUrl = null;
        let imgsUrls = [];
        if (imagesArray?.length > 0 && imagesArray["image"][0]) {
            profileImageUrl = await this.uploadImage(imagesArray["image"][0]);
            (await eventToUpdate).imageFile = profileImageUrl;
        }
        if (imagesArray['eventImages[]']?.length > 0) {
            let newImgs = await Promise.all(imagesArray['eventImages[]'].map(img => this.uploadImage(img)));
            imgsUrls = (await eventToUpdate).imagesArray.concat(newImgs);
            (await eventToUpdate).imagesArray = imgsUrls;
        }
        (await eventToUpdate).name = event.name;
        (await eventToUpdate).text = event.text;
        (await eventToUpdate).category = event.category;
        await (await eventToUpdate).save();
        return (await eventToUpdate).toObject();
    }
    async delete(id) {
        return await this.eventModel.findByIdAndRemove(id);
    }
    async deleteImageFromEvent(imageId, eventId) {
        console.log(imageId, "IDDDDDDDDDDDDDDDDDDDDD", eventId);
        const generalEvent = await this.eventModel.findById(eventId);
        const imagesArray = generalEvent?.imagesArray;
        if (imagesArray) {
            let index = imagesArray.findIndex((img) => img.toString() === imageId);
            if (index === -1) {
                return { error: 'Image not found' };
            }
            imagesArray.splice(index, 1);
            await generalEvent.save();
        }
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
    __param(1, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Connection])
], GeneralEventService);
//# sourceMappingURL=generalEvent.service.js.map