import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MuscleEnum } from 'src/enums/muscle.enum';

export class CreateExerciseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsEnum(MuscleEnum)
  @IsNotEmpty()
  muscle: MuscleEnum;
}

export class UpdateExerciseDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(MuscleEnum)
  muscle: MuscleEnum;
}
