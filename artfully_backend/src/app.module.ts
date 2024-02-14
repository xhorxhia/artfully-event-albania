import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeneralEventController } from './generalEvent/generalEvent.controller';
import { GeneralEventService } from './generalEvent/generalEvent.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GeneralEvent, GeneralEventSchema } from './schemas/generalEvent.schema';
import { UserController } from './auth/user.controller';
import { UserService } from './auth/user.service';
import { User, UserSchema } from './schemas/user.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/artfullyEvents'),
            MongooseModule.forFeature([
              { name: GeneralEvent.name, schema: GeneralEventSchema },
              { name: User.name, schema: UserSchema}
            ]),
            MulterModule.register({
              dest: './uploads', // Define the destination for storing uploaded files
            }),],
  controllers: [
    AppController,
    GeneralEventController,
    UserController
  ],
  providers: [
    AppService,
    GeneralEventService, 
    UserService
  ],
})
export class AppModule {}
