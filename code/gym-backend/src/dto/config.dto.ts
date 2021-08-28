import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateConfigDTO {
  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsString()
  favouriteExerciseId?: Types.ObjectId;
}

export class UpdateConfigDTO {
  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsString()
  favouriteExerciseId?: Types.ObjectId;
}
