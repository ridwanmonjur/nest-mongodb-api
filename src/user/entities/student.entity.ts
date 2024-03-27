import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User, UserSchema } from './user.entity';

@Schema()
export class Student extends Document {
    @Prop({ type: String, required: true })
    phoneNumber?: string;

    @Prop({ type: String, required: true })
    name?: string;

    @Prop({ type: String, required: true })
    instituteName: string;

    @Prop({ type: UserSchema })
    user: User; 
}

export const StudentSchema = SchemaFactory.createForClass(Student);
