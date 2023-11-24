import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    private readonly userModel;
    constructor(userService: UserService, userModel: Model<User>);
    createUser(response: any, user: User): Promise<any>;
    checkUser(response: any, user: User): Promise<any>;
}
