import { Injectable } from "@nestjs/common";
import { GeneralEventInt } from "./generalEvent";
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { GeneralEvent, GeneralEventDocument } from "src/schemas/generalEvent.schema";
import { GeneralEventDto } from "./generalEvent.dto";
import { Comment } from "src/schemas/comment.schema";


@Injectable()
export class GeneralEventService{
    private events: GeneralEventInt[] = [];

    constructor(@InjectModel(GeneralEvent.name) private eventModel: Model<GeneralEventDocument>) {}

    // async create(event: GeneralEvent): Promise<GeneralEvent> {
    //     const newProduct = new this.eventModel(GeneralEvent);
    //     return newProduct.save();
    // }

    async create(event: GeneralEventDto): Promise<GeneralEventDto> {
        const newProduct = new this.eventModel(event);
        return newProduct.save();
    }


    async findAll(): Promise<GeneralEvent[]> {
        return await this.eventModel.find().exec();
    }

    async readById(id): Promise<GeneralEvent> {
        return await this.eventModel.findById(id).exec();
    }

    async update(id, Event: GeneralEvent): Promise<GeneralEvent> {
        return await this.eventModel.findByIdAndUpdate(id, Event, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.eventModel.findByIdAndRemove(id);
    }

    async findByTypeAndCategory(type: string, category: string): Promise<GeneralEvent[]>{
        return this.eventModel.find({type, category}).exec();
    }

    async deleteComment(eventId, commentId): Promise<any> {
       const generalEvent = await this.eventModel.findById(eventId);
        const comments = generalEvent.comments
        //console.log(comments)


       const commentIndex = generalEvent.comments.findIndex(
        (comment) => comment._id.toString() == commentId,
      ); 
     
      if (commentIndex === -1) {
        return { error: 'Comment not found' };
      }
    
      // Remove the comment from the comments array
      comments.splice(commentIndex, 1);
    
      // Save the updated GeneralEvent document
      await generalEvent.save();
    }

    async addComment(eventId, comment: Comment): Promise<any> {
        const generalEvent = await this.eventModel.findById(eventId);
        const comments = generalEvent.comments
        comments.push(comment);

        await generalEvent.save(); 
    }


    // findAll(): EventInt[]{
    //     return this.events;
    // }
}