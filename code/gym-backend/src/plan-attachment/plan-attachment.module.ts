import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  PlanAttachment,
  PlanAttachmentSchema,
} from 'src/schemas/plan-attachment.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PlanAttachmentController } from './plan-attachment.controller';
import { PlanAttachmentService } from './plan-attachment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlanAttachment.name, schema: PlanAttachmentSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [PlanAttachmentController],
  providers: [PlanAttachmentService],
})
export class PlanAttachmentModule {}
