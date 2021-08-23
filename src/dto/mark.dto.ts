import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMarkDTO {
  @IsNumber()
  height: number;

  @IsNumber()
  serie: number;

  @IsNumber()
  reps: number;

  @IsNotEmpty()
  exerciseId: Types.ObjectId;
}

export class UpdateMarkDTO {
  @IsNumber()
  height: number;

  @IsNumber()
  serie: number;

  @IsNumber()
  reps: number;
}
