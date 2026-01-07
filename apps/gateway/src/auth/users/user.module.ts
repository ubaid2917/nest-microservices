import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Module({
  imports: [
   MongooseModule.forFeature([{ name: User.name, schema: UserDocument }])
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
