import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import {
  CreateMarkDTO,
  FindMarkByUserAndExerciseParams,
} from 'src/dto/mark.dto';
import { AllExceptionsFilter } from 'src/errors/all-exception.error';
import { Mark } from 'src/schemas/mark.schema';
import { MarkService } from './mark.service';

@Controller('mark')
@UseFilters(AllExceptionsFilter)
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Get()
  findAllByUserAndExercise(
    @Query() queryParams: FindMarkByUserAndExerciseParams
  ): Promise<Mark[]> {
    return this.markService.findAllByUserAndExercise(
      queryParams.userId,
      queryParams.exerciseId
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Mark> {
    return this.markService.findOne(id);
  }

  @Post()
  create(@Body() createMarkDTO: CreateMarkDTO): Promise<Mark> {
    return this.markService.create(createMarkDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.markService.delete(id);
  }

  @Put('/latest-used/:id')
  setMarkAsLatestUsed(@Param('id') id: string): Promise<Mark> {
    return this.markService.setMarkAsLatestUsed(id);
  }
}
