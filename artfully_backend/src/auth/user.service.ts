import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument, UserModel } from "src/schemas/user.schema";


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}


    async create(user: User): Promise<User>{
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async userExists(username: string): Promise<boolean> {
        const existingUser = await this.userModel.findOne({ username }).exec();
        return !!existingUser;
    }

     async findUser(username: string): Promise<User> {
        const existingUser = await this.userModel.findOne({ username }).exec();
        return existingUser;
    }
}    