import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';
import { PlanAttachmentEnum } from 'src/enums/plan-attachment.enum';

export class CreatePlanAttachmentDTO {
  @IsString()
  path: string;

  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @IsNumber()
  year: string;

  @IsEnum(PlanAttachmentEnum)
  @IsNotEmpty()
  type: PlanAttachmentEnum;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: Types.ObjectId;
}

export class FindPlanAttachmentsByUserAndDate {
  userId: string;
  month: number;
  year: number;
}
