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
import { CreateMarkDTO, UpdateMarkDTO } from 'src/dto/mark.dto';
import { AllExceptionsFilter } from 'src/errors/all-exception.error';
import { Mark } from 'src/schemas/mark.schema';
import { MarkService } from './mark.service';

@Controller('mark')
@UseFilters(AllExceptionsFilter)
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
  create(@Body() createMarkDTO: CreateMarkDTO): Promise<Mark> {
    return this.markService.create(createMarkDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarkDTO: UpdateMarkDTO
  ): Promise<Mark> {
    return this.markService.update(id, updateMarkDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.markService.delete(id);
  }
}
