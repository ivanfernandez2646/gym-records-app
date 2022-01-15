import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from '../schemas/exercise.schema';
import { Mark, MarkSchema } from '../schemas/mark.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mark.name, schema: MarkSchema }]),
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
