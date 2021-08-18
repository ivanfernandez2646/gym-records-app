import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseDto, UpdateExerciseDto } from 'src/dto/exercise.dto';
import { Exercise, ExerciseDocument } from 'src/schemas/exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>
  ) {}

  async findAll(): Promise<Exercise[]> {
    return this.exerciseModel.find();
  }

  async findOne(id: string): Promise<Exercise> {
    return this.exerciseModel.findById(id);
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const createdExercise = new this.exerciseModel(createExerciseDto);
    return createdExercise.save();
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto
  ): Promise<Exercise> {
    return this.exerciseModel.findByIdAndUpdate(id, updateExerciseDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Exercise> {
    return this.exerciseModel.findByIdAndRemove(id);
  }
}
