import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserSchema } from './user.entity';
import { Address } from './address.entity';

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

    @Prop({ type: Types.ObjectId, ref: 'Address' })
    address: Address;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
