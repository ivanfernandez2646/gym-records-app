import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Config, ConfigSchema } from 'src/schemas/config.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
