import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/role.enum';

@Schema()
export class User extends Document {
  @Prop({  type: String, required: true })
  email: string;

  @Prop({  type: String, required: true })
  password: string;

  @Prop({ required: true, type: [{ type: String, enum: Object.values(Role) }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
