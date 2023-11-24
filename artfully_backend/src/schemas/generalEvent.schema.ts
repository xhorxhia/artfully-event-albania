import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
  comments: Comment[]

}

export const GeneralEventSchema = SchemaFactory.createForClass(GeneralEvent);