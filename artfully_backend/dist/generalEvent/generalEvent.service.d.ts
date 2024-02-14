/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Connection, Model } from 'mongoose';
import { GeneralEvent, GeneralEventDocument } from "src/schemas/generalEvent.schema";
import { GeneralEventDto } from "./generalEvent.dto";
import { Comment } from "src/schemas/comment.schema";
export declare class GeneralEventService {
    private eventModel;
    private readonly connection;
    private events;
    private client;
    private db;
    private bucket;
    constructor(eventModel: Model<GeneralEventDocument>, connection: Connection);
    private connectToMongoDB;
    create(event: any, imagesArray: any[]): Promise<GeneralEventDto>;
    private uploadImage;
    getFileStreamById(id: string): Promise<any>;
    findAll(): Promise<GeneralEvent[]>;
    readById(id: any): Promise<GeneralEvent>;
    update(id: any, event: any, imagesArray: any[]): Promise<GeneralEventDto>;
    delete(id: any): Promise<any>;
    deleteImageFromEvent(imageId: string, eventId: string): Promise<{
        error: string;
    }>;
    findByTypeAndCategory(type: string, category: string): Promise<GeneralEvent[]>;
    deleteComment(eventId: any, commentId: any): Promise<any>;
    addComment(eventId: any, comment: Comment): Promise<any>;
}
