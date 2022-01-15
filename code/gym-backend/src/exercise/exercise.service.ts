import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseDTO, UpdateExerciseDTO } from '../dto/exercise.dto';
import { Exercise, ExerciseDocument } from '../schemas/exercise.schema';

//TODO: On delete, check if id exist before
//TODO: On update, check if id exist before
@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>
  ) {}

  async findAll(): Promise<Exercise[]> {
    return await this.exerciseModel.find().sort('muscle');
  }

  async findOne(id: string): Promise<Exercise> {
    return await this.exerciseModel.findById(id);
  }

  async create(createExerciseDTO: CreateExerciseDTO): Promise<Exercise> {
    const createExercise: ExerciseDocument = new this.exerciseModel(
      createExerciseDTO
    );
    return await createExercise.save();
  }

  async update(
    id: string,
    updateExerciseDTO: UpdateExerciseDTO
  ): Promise<Exercise> {
    return await this.exerciseModel.findByIdAndUpdate(id, updateExerciseDTO, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deleteExercise: ExerciseDocument =
        await this.exerciseModel.findById(id);
      await deleteExercise.deleteOne();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
