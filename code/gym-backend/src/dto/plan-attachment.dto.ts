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

export class DownloadedFileDTO {
  fileName: string;
  size: number;
  data: Uint8Array;
  user: string;

  constructor(fileName: string, size: number, data: Uint8Array, user: string) {
    this.fileName = fileName;
    this.size = size;
    this.data = data;
    this.user = user;
  }
}

export class FindPlanAttachmentsByUserAndDate {
  userId: string;
  month: number;
  year: number;
}

export class DownloadPlanAttachmentParams {
  path: string;
}

export class DeletePlanAttachmentParams {
  id: string;
  path: string;
}
