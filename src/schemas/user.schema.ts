import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Config } from './config.schema';
import { Mark } from './mark.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
    name: 'user_name',
  })
  userName: string;

  @Prop({ type: String, required: true, name: 'full_name' })
  fullName: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, name: 'hash_password' })
  hashPassword: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Marks', name: 'favourite_exercise' }],
  })
  marks: Mark[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Config', required: true }] })
  config: Config;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('deleteOne', { document: true }, function (next) {
  this.model('Mark').deleteMany({ user: this._id }).exec();
  this.model('Config').deleteOne({ user: this._id }).exec();
  next();
});
