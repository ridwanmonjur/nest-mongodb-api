import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({  type: String, required: true })
  email: string;

  @Prop({  type: String, required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'student'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
