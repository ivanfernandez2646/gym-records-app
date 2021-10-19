import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import {
  CreatePlanAttachmentDTO,
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
  create(
    @Body() createPlanAttachmentDTO: CreatePlanAttachmentDTO
  ): Promise<PlanAttachment> {
    return this.planAttachmentService.create(createPlanAttachmentDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.planAttachmentService.delete(id);
  }
}
