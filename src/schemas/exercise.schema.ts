import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MuscleEnum } from 'src/enums/muscle.enum';

export type ExerciseDocument = Exercise & Document;

@Schema()
export class Exercise {
  @Prop({ type: String, required: true, index: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  muscle: MuscleEnum;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
