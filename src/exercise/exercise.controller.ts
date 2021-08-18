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
import { Query } from 'mongoose';
import { CreateExerciseDto, UpdateExerciseDto } from 'src/dto/exercise.dto';
import { MongoExceptionFilter } from 'src/errors/mongo.error';
import { Exercise } from 'src/schemas/exercise.schema';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
@UseFilters(MongoExceptionFilter)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  findAll(): Promise<Exercise[]> {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
  }

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(createExerciseDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.delete(id);
  }
}
