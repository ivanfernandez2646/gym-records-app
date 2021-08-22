import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MuscleEnum } from 'src/enums/muscle.enum';
import { Exercise } from './exercise.schema';

export type MarkDocument = Mark & Document;

@Schema()
export class Mark {
  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number, required: true })
  serie: number;

  @Prop({ type: Number, required: true })
  reps: MuscleEnum;

  @Prop({ type: Date, default: Date.now() })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Exercise', required: false })
  exercise: Exercise;
}

export const MarkSchema = SchemaFactory.createForClass(Mark);