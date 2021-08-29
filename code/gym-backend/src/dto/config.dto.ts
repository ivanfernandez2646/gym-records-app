import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateConfigDTO {
  @IsNumber()
  weight: number;

  @IsDecimal({ decimal_digits: '2' })
  height: number;

  @IsString()
  @IsOptional()
  favouriteExerciseId?: Types.ObjectId;
}

export class UpdateConfigDTO {
  @IsNumber()
  weight: number;

  @IsDecimal({ decimal_digits: '2' })
  height: number;

  @IsString()
  @IsOptional()
  favouriteExerciseId?: Types.ObjectId;
}
