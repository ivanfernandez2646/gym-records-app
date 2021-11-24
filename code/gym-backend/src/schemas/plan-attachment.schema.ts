import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PlanAttachmentEnum } from 'src/enums/plan-attachment.enum';
import { User } from './user.schema';

export type PlanAttachmentDocument = PlanAttachment & Document;

@Schema()
export class PlanAttachment {
  @Prop({ type: String, required: true })
  path: string;

  @Prop({ type: Number, required: true })
  month: number;

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({ type: String, required: true })
  type: PlanAttachmentEnum;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Date, default: Date.now(), name: 'upload_date' })
  uploadDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId;
}

export const PlanAttachmentSchema =
  SchemaFactory.createForClass(PlanAttachment);
PlanAttachmentSchema.pre('deleteOne', { document: true }, function (next) {
  this.model('User')
    .updateOne({}, { $pull: { planAttachments: this.id } }, { multi: true })
    .exec();
  next();
});
