import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  user: Types.ObjectId;

  @IsNotEmpty()
  exercise: Types.ObjectId;
}

export class FindMarkByUserAndExerciseParams {
  userId: string;
  exerciseId: string;
}
