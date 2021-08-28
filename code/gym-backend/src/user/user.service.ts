import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { CreateUserDTO } from 'src/dto/user.dto';
import { Config, ConfigDocument } from 'src/schemas/config.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Config.name) private configModel: Model<ConfigDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const session: ClientSession = await this.userModel.startSession();
    session.startTransaction();
    try {
      const newUser: UserDocument = new this.userModel(createUserDTO);
      const newConfig: ConfigDocument = new this.configModel(
        createUserDTO.config
      );
      newConfig.user = newUser;
      newUser.config = newConfig;
      await newConfig.save();
      const userSaved: UserDocument = await newUser.save();

      await session.commitTransaction();
      session.endSession();
      return userSaved;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
