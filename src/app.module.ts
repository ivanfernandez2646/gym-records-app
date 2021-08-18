import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://gymUser:gymUser@cluster0.ew7po.gcp.mongodb.net/gym_records?retryWrites=true&w=majority',
      { useCreateIndex: true, useFindAndModify: false }
    ),
    ExerciseModule,
  ],
})
export class AppModule {}
