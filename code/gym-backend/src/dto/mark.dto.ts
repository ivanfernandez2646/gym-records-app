import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMarkDTO {
  @IsNumber()
  weight: number;

  @IsNumber()
  serie: number;

  @IsNumber()
  reps: number;

  @IsNotEmpty()
  exerciseId: Types.ObjectId;
}

export class UpdateMarkDTO {
  @IsNumber()
  weight: number;

  @IsNumber()
  serie: number;

  @IsNumber()
  reps: number;
}
