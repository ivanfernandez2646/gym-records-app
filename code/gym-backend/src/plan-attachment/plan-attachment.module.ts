import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  controllers: [PlanAttachmentController],
  providers: [PlanAttachmentService],
})
export class PlanAttachmentModule {}
