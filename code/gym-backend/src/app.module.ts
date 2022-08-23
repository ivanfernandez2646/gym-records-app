import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnConfigModule } from './config/config.module';
import { ExerciseModule } from './exercise/exercise.module';
import { MarkModule } from './mark/mark.module';
import { PlanAttachmentModule } from './plan-attachment/plan-attachment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://gymUser:gymUser@cluster0.ew7po.gcp.mongodb.net/gym_records_backup?retryWrites=true&w=majority',
      { useCreateIndex: true, useFindAndModify: false }
    ),
    ExerciseModule,
    MarkModule,
    OwnConfigModule,
    UserModule,
    PlanAttachmentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
