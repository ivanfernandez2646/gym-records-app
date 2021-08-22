import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { CreateMarkDto, UpdateMarkDto } from 'src/dto/mark.dto';
import { MongoExceptionFilter } from 'src/errors/mongo.error';
import { Mark } from 'src/schemas/mark.schema';
import { MarkService } from './mark.service';

@Controller('mark')
@UseFilters(MongoExceptionFilter)
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Get()
  findAll(): Promise<Mark[]> {
    return this.markService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Mark> {
    return this.markService.findOne(id);
  }

  @Post()
  create(@Body() createExerciseDto: CreateMarkDto): Promise<Mark> {
    return this.markService.create(createExerciseDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateMarkDto
  ): Promise<Mark> {
    return this.markService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.markService.delete(id);
  }
}
