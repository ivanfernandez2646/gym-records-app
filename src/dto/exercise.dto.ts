import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MuscleEnum } from 'src/enums/muscle.enum';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(MuscleEnum)
  @IsNotEmpty()
  muscle: MuscleEnum;
}

export class UpdateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(MuscleEnum)
  muscle: MuscleEnum;
}
