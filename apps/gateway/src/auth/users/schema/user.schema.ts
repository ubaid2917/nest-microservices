import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserType } from '../../enums/user-type.enum';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  clerkUserId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String, required: true, enum: UserType, default: UserType.USER })
  role: UserType;

  @Prop({ required: true, default: false })
  isAdmin: boolean;

  @Prop({})
  password: string;
}

export const UserDocument = SchemaFactory.createForClass(User);
