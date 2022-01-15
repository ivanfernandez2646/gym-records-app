import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs';
import { ClientSession, Model } from 'mongoose';
import { CreateUserDTO, LoginUserDTO } from '../dto/user.dto';
import { Config, ConfigDocument } from '../schemas/config.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { ENCRYPTION_SALT_ROUNDS } from '../utils/generic.constants';
import { calculateBMI } from '../utils/generic.functions';

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
      newUser.hashPassword = bcryptjs.hashSync(
        createUserDTO.password,
        ENCRYPTION_SALT_ROUNDS
      );
      const newConfig: ConfigDocument = new this.configModel(
        createUserDTO.config
      );
      newConfig.bmi = calculateBMI(newConfig.weight, newConfig.height);
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

  async login(loginUserDTO: LoginUserDTO): Promise<User> {
    const user = await this.userModel.findOne({
      userName: loginUserDTO.userName,
    });
    if (user) {
      const isMatch = await bcryptjs.compare(
        loginUserDTO.password,
        user.hashPassword
      );
      if (isMatch) {
        return user;
      } else {
        throw 'Password incorrect';
      }
    } else {
      throw 'User not found';
    }
  }
}
