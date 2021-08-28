import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from 'src/schemas/exercise.schema';
import { Mark, MarkSchema } from 'src/schemas/mark.schema';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
    MongooseModule.forFeature([{ name: Mark.name, schema: MarkSchema }]),
  ],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
