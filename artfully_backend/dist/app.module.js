"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const generalEvent_controller_1 = require("./generalEvent/generalEvent.controller");
const generalEvent_service_1 = require("./generalEvent/generalEvent.service");
const mongoose_1 = require("@nestjs/mongoose");
const generalEvent_schema_1 = require("./schemas/generalEvent.schema");
const user_controller_1 = require("./auth/user.controller");
const user_service_1 = require("./auth/user.service");
const user_schema_1 = require("./schemas/user.schema");
const platform_express_1 = require("@nestjs/platform-express");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://localhost/artfullyEvents'),
            mongoose_1.MongooseModule.forFeature([
                { name: generalEvent_schema_1.GeneralEvent.name, schema: generalEvent_schema_1.GeneralEventSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema }
            ]),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),],
        controllers: [
            app_controller_1.AppController,
            generalEvent_controller_1.GeneralEventController,
            user_controller_1.UserController
        ],
        providers: [
            app_service_1.AppService,
            generalEvent_service_1.GeneralEventService,
            user_service_1.UserService
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map