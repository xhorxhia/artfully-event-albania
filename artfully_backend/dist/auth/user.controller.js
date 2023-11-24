"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, userModel) {
        this.userService = userService;
        this.userModel = userModel;
    }
    async createUser(response, user) {
        const { username } = user;
        const userExists = await this.userService.userExists(username);
        if (userExists) {
            throw new common_1.ConflictException('User already exists');
        }
        else {
            const newUser = await this.userService.create(user);
            return response.status(common_1.HttpStatus.CREATED).json({
                newUser
            });
        }
    }
    async checkUser(response, user) {
        const { username } = user;
        const userExists = await this.userService.findUser(username);
        if (userExists.password == user.password) {
            return response.status(common_1.HttpStatus.OK).json({
                userExists
            });
        }
        else {
            return response.status("Account not found", common_1.HttpStatus.NOT_FOUND).json({});
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('addUser'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('check'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user/'),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        mongoose_2.Model])
], UserController);
//# sourceMappingURL=user.controller.js.map