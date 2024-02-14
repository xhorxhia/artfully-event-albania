import { Bind, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { response } from "express";
import { GeneralEvent } from "src/schemas/generalEvent.schema";
import { GeneralEventDto } from "./generalEvent.dto";
import { GeneralEventService } from "./generalEvent.service";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';


@Controller('generalEvent/')
export class GeneralEventController {

    constructor(private generalEventService: GeneralEventService) { }
        

    @Post('add')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'eventImages[]' },
      ]))       
      async createEvent(@Res() response, @Body() event, @UploadedFiles() imagesArray:  Array<Multer.File>) {
      try {        
        const newEvent = await this.generalEventService.create(event, imagesArray);

        return response.status(HttpStatus.CREATED).json({
            newEvent
        })
      } catch (error) {
        // Handle errors
        return { error: 'Failed to process files' };
      }
    }

    @Get('getAll')
    async fetchAll(@Res() response) {
        const events = await this.generalEventService.findAll();
        return response.status(HttpStatus.OK).json({
            events
        })
    }

    @Get(':id')
    async findEventById(@Res() response, @Param('id') id) {
        const event = await this.generalEventService.readById(id);
        return response.status(HttpStatus.OK).json({
            event
        })
    }

    @Get('image/:id')
    async findImageById(@Res() response, @Param('id') id) {
        const imageStream = await this.generalEventService.getFileStreamById(id);

        if (!imageStream) {
            return response.status(404).send('Image not found');
        }
        const contentType = this.getContentType(id);

        response.set('Content-Type', contentType);

        imageStream.pipe(response);
    }

    getContentType(filename: string) {
        const extension = filename.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'jpeg':
            case 'jpg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            default:
                return null;
        }
    }


    @Get(':type/:category')
    async findBytypeAndCategory(@Res() response, @Param('type') type, @Param('category') category) {
        const event = await this.generalEventService.findByTypeAndCategory(type, category);
        return response.status(HttpStatus.OK).json({
            event
        })
    }

    @Put(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'eventImages[]' },
      ])) 
    async update(@Res() response, @Param('id') id, @Body() event: GeneralEvent, @UploadedFiles() imagesArray:  Array<Multer.File>) {
        try {        
            const updatedEvent = await this.generalEventService.update(id,event, imagesArray);
    
            return response.status(HttpStatus.OK).json({
                updatedEvent
            })
        } catch (error) {
            return { error: 'Failed to process files' };
        }
    }

    @Delete(':id')
    async delete(@Res() response, @Param('id') id) {
        const deletedEvent = await this.generalEventService.delete(id);
        return response.status(HttpStatus.OK).json({
            deletedEvent
        })
    }


    @Delete(':eventId/comments/:commentId')
    async deleteComment(@Res() response, @Param('eventId') eventId, @Param('commentId') commentId) {
        const deletedComment = this.generalEventService.deleteComment(eventId, commentId);
        return response.status(HttpStatus.OK).json({
            deletedComment
        })
    }

    @Delete('deleteImage/:imageId/event/:eventId')
    async deleteImageFromEvent(@Res() response, @Param('imageId') imageId, @Param('eventId') eventId) {
        const deletedImage = this.generalEventService.deleteImageFromEvent(imageId, eventId);
        return response.status(HttpStatus.OK).json({
            deletedImage
        })
    }

    @Post(':eventId/addComments')
    async addComment(@Res() response, @Param('eventId') eventId, @Body() comment) {
        const comments = this.generalEventService.addComment(eventId, comment)
        return response.status(HttpStatus.OK).json({
            comments
        })
    }

}