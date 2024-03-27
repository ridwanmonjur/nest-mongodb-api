import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserSchema } from './user.entity';
import { Address, AddressSchema } from './address.entity';

@Schema()
export class Student extends Document {
    @Prop({ type: String, required: true })
    phoneNumber?: string;

    @Prop({ type: String, required: true })
    name?: string;

    @Prop({ type: String, required: true })
    instituteName: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User; 

    @Prop({ type: AddressSchema })
    address: Address;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
