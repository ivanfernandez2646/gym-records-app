import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  DeletePlanAttachmentParams,
  DownloadedFileDTO,
  DownloadPlanAttachmentParams,
  FindPlanAttachmentsByUserAndDate,
} from 'src/dto/plan-attachment.dto';
import { AllExceptionsFilter } from 'src/errors/all-exception.error';
import { PlanAttachment } from 'src/schemas/plan-attachment.schema';
import { PlanAttachmentService } from './plan-attachment.service';

@Controller('plan-attachment')
@UseFilters(AllExceptionsFilter)
export class PlanAttachmentController {
  constructor(private readonly planAttachmentService: PlanAttachmentService) {}

  @Get()
  findAllByUserAndDate(
    @Query() queryParams: FindPlanAttachmentsByUserAndDate
  ): Promise<PlanAttachment[]> {
    return this.planAttachmentService.findAllByUserAndDate(
      queryParams.userId,
      queryParams.month,
      queryParams.year
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPlanAttachmentDTO
  ): Promise<PlanAttachment> {
    if (createPlanAttachmentDTO.name === undefined) {
      createPlanAttachmentDTO.name = file.originalname.split('.')[0];
    }
    return this.planAttachmentService.create(createPlanAttachmentDTO, file);
  }

  @Get('download')
  downloadFile(
    @Query() queryParams: DownloadPlanAttachmentParams
  ): Promise<DownloadedFileDTO> {
    return this.planAttachmentService.downloadFile(queryParams.path);
  }

  @Delete()
  remove(@Query() queryParams: DeletePlanAttachmentParams): Promise<boolean> {
    return this.planAttachmentService.delete(queryParams.id, queryParams.path);
  }
}
