import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExerciseDto, UpdateExerciseDto } from 'src/dto/exercise.dto';
import { Exercise, ExerciseDocument } from 'src/schemas/exercise.schema';
import { Mark, MarkDocument } from 'src/schemas/mark.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>,
    @InjectModel(Mark.name) private markModel: Model<MarkDocument>
  ) {}

  async findAll(): Promise<Exercise[]> {
    return await this.exerciseModel.find();
  }

  async findOne(id: string): Promise<Exercise> {
    return await this.exerciseModel.findById(id);
  }

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const createExercise: ExerciseDocument = new this.exerciseModel(
      createExerciseDto
    );
    return await createExercise.save();
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto
  ): Promise<Exercise> {
    return await this.exerciseModel.findByIdAndUpdate(id, updateExerciseDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const session = await this.exerciseModel.startSession();
    session.startTransaction();
    try {
      const deleteExercise: ExerciseDocument =
        await this.exerciseModel.findById(id);
      for (let i = 0; i < deleteExercise.marks.length; i++) {
        const deleteMark: MarkDocument = await this.markModel.findById(
          deleteExercise.marks[i]
        );
        await deleteMark.delete();
      }
      await deleteExercise.delete();

      await session.commitTransaction();
      session.endSession();
      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
