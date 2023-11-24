import { Body, ConflictException, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { response } from "express";
import { Model } from "mongoose";
import { User, UserModel } from "src/schemas/user.schema";
import { UserService } from "./user.service";



@Controller('user/')
export class UserController {

    constructor(private userService: UserService,
        @InjectModel('User') private readonly userModel: Model<User>){}


    @Post('addUser')
    async createUser(@Res() response, @Body() user: User) {
        const { username } = user;
        const userExists = await this.userService.userExists(username);

    if (userExists) {
      throw new ConflictException('User already exists');
    }
    else{
        const newUser = await this.userService.create(user);  
        return response.status(HttpStatus.CREATED).json({
            newUser
        }) 
    }
        
    }

    @Post('check')
    async checkUser(@Res() response, @Body() user: User) {
        const { username } = user;
        const userExists = await this.userService.findUser(username);

        if( userExists.password == user.password){
            return response.status(HttpStatus.OK).json({
                userExists
            }) 
        }
        else{
         return response.status("Account not found",HttpStatus.NOT_FOUND).json({
            
        }) 
        }
        
    }
}