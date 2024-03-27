import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Schedule extends Document {
  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: [String], required: true })
  classDays: string[];

  @Prop({ required: true })
  classTime: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);