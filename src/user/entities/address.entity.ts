import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  street: string;
  city: string;
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);