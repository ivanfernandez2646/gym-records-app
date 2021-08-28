import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseModule } from './exercise/exercise.module';
import { MarkModule } from './mark/mark.module';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://gymUser:gymUser@cluster0.ew7po.gcp.mongodb.net/gym_records?retryWrites=true&w=majority',
      { useCreateIndex: true, useFindAndModify: false }
    ),
    ExerciseModule,
    MarkModule,
    ConfigModule,
    UserModule,
  ],
})
export class AppModule {}
