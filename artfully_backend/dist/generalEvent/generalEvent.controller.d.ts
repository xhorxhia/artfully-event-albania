import { GeneralEvent } from "src/schemas/generalEvent.schema";
import { GeneralEventService } from "./generalEvent.service";
import { Multer } from 'multer';
export declare class GeneralEventController {
    private generalEventService;
    constructor(generalEventService: GeneralEventService);
    createEvent(response: any, event: any, imagesArray: Array<Multer.File>): Promise<any>;
    fetchAll(response: any): Promise<any>;
    findEventById(response: any, id: any): Promise<any>;
    findImageById(response: any, id: any): Promise<any>;
    getContentType(filename: string): "image/jpeg" | "image/png";
    findBytypeAndCategory(response: any, type: any, category: any): Promise<any>;
    update(response: any, id: any, event: GeneralEvent, imagesArray: Array<Multer.File>): Promise<any>;
    delete(response: any, id: any): Promise<any>;
    deleteComment(response: any, eventId: any, commentId: any): Promise<any>;
    deleteImageFromEvent(response: any, imageId: any, eventId: any): Promise<any>;
    addComment(response: any, eventId: any, comment: any): Promise<any>;
}
