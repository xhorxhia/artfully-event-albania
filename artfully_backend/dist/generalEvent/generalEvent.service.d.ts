import { Model } from 'mongoose';
import { GeneralEvent, GeneralEventDocument } from "src/schemas/generalEvent.schema";
import { GeneralEventDto } from "./generalEvent.dto";
import { Comment } from "src/schemas/comment.schema";
export declare class GeneralEventService {
    private eventModel;
    private events;
    constructor(eventModel: Model<GeneralEventDocument>);
    create(event: GeneralEventDto): Promise<GeneralEventDto>;
    findAll(): Promise<GeneralEvent[]>;
    readById(id: any): Promise<GeneralEvent>;
    update(id: any, Event: GeneralEvent): Promise<GeneralEvent>;
    delete(id: any): Promise<any>;
    findByTypeAndCategory(type: string, category: string): Promise<GeneralEvent[]>;
    deleteComment(eventId: any, commentId: any): Promise<any>;
    addComment(eventId: any, comment: Comment): Promise<any>;
}
