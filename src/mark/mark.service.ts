import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMarkDto, UpdateMarkDto } from 'src/dto/mark.dto';
import { Exercise, ExerciseDocument } from 'src/schemas/exercise.schema';
import { Mark, MarkDocument } from 'src/schemas/mark.schema';

//TODO: On create, check if exercise id exist before
//TODO: On delete, check if mark id exist before
//TODO: On update, check if mark and exercise id exist before
@Injectable()
export class MarkService {
  constructor(
    @InjectModel(Mark.name) private markModel: Model<MarkDocument>,
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>
  ) {}

  async findAll(): Promise<Mark[]> {
    return await this.markModel.find();
  }

  async findOne(id: string): Promise<Mark> {
    return await this.markModel.findById(id);
  }

  async create(createMarkDto: CreateMarkDto): Promise<Mark> {
    const session = await this.markModel.startSession();
    session.startTransaction();
    try {
      const newMark = new this.markModel(createMarkDto);
      const exercise = await this.exerciseModel.findById(
        createMarkDto.exerciseId
      );
      newMark.exercise = exercise._id;
      exercise.marks.push(newMark);
      await exercise.save();
      const markSaved = await newMark.save();

      await session.commitTransaction();
      session.endSession();
      return markSaved;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async update(id: string, updateMarkDto: UpdateMarkDto): Promise<Mark> {
    return await this.markModel.findByIdAndUpdate(id, updateMarkDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deleteMark = await this.markModel.findById(id);
      await deleteMark.deleteOne();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
