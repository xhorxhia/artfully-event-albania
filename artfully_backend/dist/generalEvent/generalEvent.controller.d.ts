import { GeneralEvent } from "src/schemas/generalEvent.schema";
import { GeneralEventDto } from "./generalEvent.dto";
import { GeneralEventService } from "./generalEvent.service";
export declare class GeneralEventController {
    private generalEventService;
    constructor(generalEventService: GeneralEventService);
    createProduct(response: any, event: GeneralEventDto): Promise<any>;
    fetchAll(response: any): Promise<any>;
    findById(response: any, id: any): Promise<any>;
    findBytypeAndCategory(response: any, type: any, category: any): Promise<any>;
    update(response: any, id: any, event: GeneralEvent): Promise<any>;
    delete(response: any, id: any): Promise<any>;
    deleteComment(response: any, eventId: any, commentId: any): Promise<any>;
    addComment(response: any, eventId: any, comment: any): Promise<any>;
}
