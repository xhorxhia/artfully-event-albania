import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { response } from "express";
import { GeneralEvent } from "src/schemas/generalEvent.schema";
import { GeneralEventDto } from "./generalEvent.dto";
import { GeneralEventService } from "./generalEvent.service";


@Controller('generalEvent/')
export class GeneralEventController {

    constructor(private generalEventService: GeneralEventService){}

//     @Post()
//   create(@Body() createPostDto: GeneralEventDto): string {
//     return `Create a new post with title`;
//   }

    // @Post()
    // async create(@Body() eventDto: GeneralEventDto){
    //     return this.eventService.create(eventDto);
    // }
    @Post('add')
    async createProduct(@Res() response, @Body() event: GeneralEventDto) {
        const newEvent = await this.generalEventService.create(event);
        return response.status(HttpStatus.CREATED).json({
            newEvent
        })
    }

    @Get('getAll')
    async fetchAll(@Res() response) {
        const events = await this.generalEventService.findAll();
        return response.status(HttpStatus.OK).json({
            events
        })
    }

    @Get(':id')
    async findById(@Res() response, @Param('id') id) {
        const event = await this.generalEventService.readById(id);
        return response.status(HttpStatus.OK).json({
            event
        })
    }
    @Get(':type/:category')
    async findBytypeAndCategory(@Res() response, @Param('type') type, @Param('category') category) {
        const event = await this.generalEventService.findByTypeAndCategory(type, category);
        return response.status(HttpStatus.OK).json({
            event
        })
    }

    @Put(':id')
    async update(@Res() response, @Param('id') id, @Body() event: GeneralEvent) {
        const updatedEvent = await this.generalEventService.update(id, event);
        return response.status(HttpStatus.OK).json({
            updatedEvent
        })
    }

    @Delete(':id')
    async delete(@Res() response, @Param('id') id) {
        const deletedEvent = await this.generalEventService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedEvent
        })
    }


    @Delete(':eventId/comments/:commentId')
    async deleteComment(@Res() response, @Param('eventId') eventId, @Param('commentId') commentId){
        const deletedComment = this.generalEventService.deleteComment(eventId, commentId);
        return response.status(HttpStatus.OK).json({
            deletedComment
        })
    }

    @Post(':eventId/addComments')
    async addComment(@Res() response, @Param('eventId') eventId, @Body() comment){
        const comments =  this.generalEventService.addComment(eventId, comment)
        return response.status(HttpStatus.OK).json({
            comments
        })
    }

}