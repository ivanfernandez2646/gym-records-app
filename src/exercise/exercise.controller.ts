import { Body, Controller, Get, Post, Put, UseFilters } from '@nestjs/common';
import { CreateExerciseDto, UpdateExerciseDto } from 'src/dto/exercise.dto';
import { MongoExceptionFilter } from 'src/errors/mongo.error';
import { Exercise } from 'src/schemas/exercise.schema';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
@UseFilters(MongoExceptionFilter)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  get(): string {
    return 'You are on ExerciseController';
  }

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseService.create(createExerciseDto);
  }
}
