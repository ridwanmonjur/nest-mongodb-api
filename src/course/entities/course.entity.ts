import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Schedule } from './schedule.entity';

@Schema()
export class Course extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  level: string;

  @Prop({ type: [String], required: true })
  topics: string[];
  
  @Prop({ type: Schedule })
  schedule: Schedule; 
}

export const CourseSchema = SchemaFactory.createForClass(Course);

