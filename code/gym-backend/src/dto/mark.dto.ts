import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMarkDTO {
  @IsNumber()
  weight: number;

  @IsNumber()
  serie: number;

  @IsNumber()
  reps: number;

  @IsNumber()
  rir: number;

  @IsNotEmpty()
  user: Types.ObjectId;

  @IsNotEmpty()
  exercise: Types.ObjectId;
}

export class UpdateMarkDTO {
  @IsNumber()
  weight: number;

  @IsNumber()
  serie: number;

  @IsNumber()
  reps: number;

  @IsNumber()
  rir: number;
}

export class FindMarkByUserAndExerciseParams {
  userId: string;
  exerciseId: string;
}
