import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserSchema } from './user.entity';

@Schema()
export class Admin extends Document {
    @Prop({ type: String, required: true })
    name?: String;

    @Prop({ type: UserSchema })
    user: User; 
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
