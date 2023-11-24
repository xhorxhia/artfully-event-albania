import { Module } from "@nestjs/common";
import { GeneralEventController } from "./generalEvent.controller";
import { GeneralEventService } from "./generalEvent.service";


@Module({
    controllers: [GeneralEventController],
    providers: [GeneralEventService],
    exports: [GeneralEventService]
})

export class EventModule {}