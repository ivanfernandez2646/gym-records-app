import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MuscleEnum } from '../enums/muscle.enum';

export class CreateExerciseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(MuscleEnum)
  @IsNotEmpty()
  muscle: MuscleEnum;

  @IsBoolean()
  isMonitorized: boolean;
}

export class UpdateExerciseDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEnum(MuscleEnum)
  muscle: MuscleEnum;

  @IsBoolean()
  isMonitorized: boolean;
}
