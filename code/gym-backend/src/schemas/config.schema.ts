import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MuscleEnum } from 'src/enums/muscle.enum';
import { Exercise } from './exercise.schema';
import { User } from './user.schema';

export type ConfigDocument = Config & Document;

@Schema()
export class Config {
  @Prop({ type: Number, required: true })
  weight: number;

  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number })
  bmi: MuscleEnum;

  @Prop({
    type: Types.ObjectId,
    ref: 'Exercise',
    required: false,
    name: 'favourite_exercise',
  })
  favouriteExercise: Exercise;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
