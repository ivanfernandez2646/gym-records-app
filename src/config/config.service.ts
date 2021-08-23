import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { UpdateConfigDTO } from 'src/dto/config.dto';
import { Config, ConfigDocument } from 'src/schemas/config.schema';
import { Exercise, ExerciseDocument } from 'src/schemas/exercise.schema';

@Injectable()
export class ConfigService {
  constructor(
    @InjectModel(Config.name) private configModel: Model<ConfigDocument>,
    @InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>
  ) {}

  async findAll(): Promise<Config[]> {
    return await this.configModel.find();
  }

  async findOne(id: string): Promise<Config> {
    return await this.configModel.findById(id);
  }

  async update(id: string, updateConfigDTO: UpdateConfigDTO): Promise<Config> {
    const session: ClientSession = await this.configModel.startSession();
    session.startTransaction();
    try {
      const updateConfig: ConfigDocument = await this.configModel.findById(id);
      //TODO: Check if favourite exercise exist, otherwise return error message
      const favouriteExercise: ExerciseDocument =
        await this.exerciseModel.findById(updateConfigDTO.favouriteExerciseId);
      updateConfig.favouriteExercise = favouriteExercise._id;
      await updateConfig.save();
      const configSaved: ConfigDocument = await updateConfig.save();

      await session.commitTransaction();
      session.endSession();
      return configSaved;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
