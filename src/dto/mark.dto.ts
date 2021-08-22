import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMarkDto {
  @IsNumber()
  height: number;

  @IsNumber()
  serie: number;

  @IsNumber()
  reps: number;

  @IsNotEmpty()
  exerciseId: Types.ObjectId;
}

export class UpdateMarkDto {
  @IsNumber()
  height: number;

  @IsNumber()
  serie: number;

  @IsNumber()
  reps: number;

  @IsNotEmpty()
  exerciseId: Types.ObjectId;
}
