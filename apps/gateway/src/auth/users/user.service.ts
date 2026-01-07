import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"; 
import {User, UserDocument} from './schema/user.schema'
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel : Model<UserDocument>
    ){}

    async upsertAuthUser(user: CreateUserDto){
        return this.userModel.findOneAndUpdate(
            {clerkUserId: user.clerkUserId},
            user,
            {upsert: true, new: true}
        )
    }
}