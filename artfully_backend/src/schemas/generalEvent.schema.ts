import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment, CommentSchema } from './comment.schema';


export type GeneralEventDocument = HydratedDocument<GeneralEvent>;

@Schema()
export class GeneralEvent {
  @Prop()
  name: string;

  @Prop()
  text: string;

  @Prop()
  type: string;

  @Prop()
  category: string;

  @Prop({type: [CommentSchema]})
  comments: Comment[];

  @Prop()
  imageFile: string;

  @Prop()
  imagesArray: string[];

}

export const GeneralEventSchema = SchemaFactory.createForClass(GeneralEvent);