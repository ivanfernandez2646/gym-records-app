import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Exercise } from './exercise.schema';
import { User } from './user.schema';

export type MarkDocument = Mark & Document;

@Schema()
export class Mark {
  @Prop({ type: Number, required: true })
  height: number;

  @Prop({ type: Number, required: true })
  serie: number;

  @Prop({ type: Number, required: true })
  reps: number;

  @Prop({ type: Date, default: Date.now() })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Exercise', required: true })
  exercise: Exercise;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const MarkSchema = SchemaFactory.createForClass(Mark);
MarkSchema.pre('deleteOne', { document: true }, function (next) {
  this.model('Exercise')
    .updateOne({}, { $pull: { marks: this.id } }, { multi: true })
    .exec();
  this.model('User')
    .updateOne({}, { $pull: { marks: this.id } }, { multi: true })
    .exec();
  next();
});
