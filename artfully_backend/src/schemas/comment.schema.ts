import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Comment extends Document {
    
  @Prop()
  description: string;

  @Prop()
  username: string;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);