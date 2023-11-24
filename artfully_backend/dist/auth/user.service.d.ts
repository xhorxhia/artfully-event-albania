import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(user: User): Promise<User>;
    userExists(username: string): Promise<boolean>;
    findUser(username: string): Promise<User>;
}
