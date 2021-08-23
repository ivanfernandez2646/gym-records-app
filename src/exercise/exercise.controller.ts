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
import { CreateExerciseDTO, UpdateExerciseDTO } from 'src/dto/exercise.dto';
import { AllExceptionsFilter } from 'src/errors/all-exception.error';
import { Exercise } from 'src/schemas/exercise.schema';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
@UseFilters(AllExceptionsFilter)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get()
  findAll(): Promise<Exercise[]> {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Exercise> {
    return this.exerciseService.findOne(id);
  }

  @Post()
  create(@Body() createExerciseDTO: CreateExerciseDTO): Promise<Exercise> {
    return this.exerciseService.create(createExerciseDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDTO: UpdateExerciseDTO
  ): Promise<Exercise> {
    return this.exerciseService.update(id, updateExerciseDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.exerciseService.delete(id);
  }
}
