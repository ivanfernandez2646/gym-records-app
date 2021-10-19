import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePlanAttachmentDTO } from 'src/dto/plan-attachment.dto';
import {
  PlanAttachment,
  PlanAttachmentDocument,
} from 'src/schemas/plan-attachment.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class PlanAttachmentService {
  constructor(
    @InjectModel(PlanAttachment.name)
    private planAttachmentModel: Model<PlanAttachmentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findAllByUserAndDate(
    userId: string,
    month: number,
    year: number
  ): Promise<PlanAttachment[]> {
    return await this.planAttachmentModel.find({
      user: new Types.ObjectId(userId),
      month: month,
      year: year,
    });
  }

  async create(
    createPlanAttachmentDTO: CreatePlanAttachmentDTO
  ): Promise<PlanAttachment> {
    const session = await this.planAttachmentModel.startSession();
    session.startTransaction();
    try {
      const newPlanAttachment: PlanAttachmentDocument =
        new this.planAttachmentModel(createPlanAttachmentDTO);
      const user: UserDocument = await this.userModel.findById(
        createPlanAttachmentDTO.user
      );
      newPlanAttachment.user = new Types.ObjectId(user.id);
      user.planAttachments.push(newPlanAttachment);
      const planAttachmentSaved: PlanAttachmentDocument =
        await newPlanAttachment.save();
      await user.save();

      await session.commitTransaction();
      session.endSession();
      return planAttachmentSaved;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const deletePlanAttachment: PlanAttachmentDocument =
        await this.planAttachmentModel.findById(id);
      await deletePlanAttachment.deleteOne();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
