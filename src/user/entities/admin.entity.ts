import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserSchema } from './user.entity';

@Schema()
export class Admin extends Document {
    @Prop({ type: String, required: true })
    name?: String;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User; 
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
