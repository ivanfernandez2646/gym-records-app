import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';
import { Config, ConfigSchema } from 'src/schemas/config.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from 'src/schemas/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }]),
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  providers: [ConfigService],
  controllers: [ConfigController],
})
export class ConfigModule {}
