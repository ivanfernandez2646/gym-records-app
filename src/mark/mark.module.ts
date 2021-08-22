import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from 'src/schemas/exercise.schema';
import { Mark, MarkSchema } from 'src/schemas/mark.schema';
import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mark.name, schema: MarkSchema }]),
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
  ],
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
