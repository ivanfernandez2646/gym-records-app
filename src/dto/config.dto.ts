import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateConfigDto {
  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsString()
  favouriteExerciseId?: Types.ObjectId;
}
