import { Injectable, NotFoundException } from "@nestjs/common";
import { GeneralEventInt } from "./generalEvent";
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { GeneralEvent, GeneralEventDocument } from "src/schemas/generalEvent.schema";
import { GeneralEventDto } from "./generalEvent.dto";
import { Comment } from "src/schemas/comment.schema";
import * as mongoose from 'mongoose';
import { GridFSBucketReadStream, GridFSBucketWriteStream, MongoClient, Db, GridFSBucket } from 'mongodb';
import { Multer } from 'multer';
import { Readable } from "stream";
import { log } from "console";



@Injectable()
export class GeneralEventService {
  private events: GeneralEventInt[] = [];
  private client: MongoClient;
  private db: Db;
  private bucket: any;

  constructor(@InjectModel(GeneralEvent.name) private eventModel: Model<GeneralEventDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.connectToMongoDB();
  }

  private async connectToMongoDB() {
    try {
      this.client = new MongoClient('mongodb://localhost:27017/?useNewUrlParser=true&useUnifiedTopology=true');

      await this.client.connect();
      this.db = this.client.db('artfullyEvents');

      // Initialize GridFSBucket once the connection is established
      this.bucket = new GridFSBucket(this.db);

      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async create(event: any,  imagesArray: any[]): Promise<GeneralEventDto> {
    console.log("array",imagesArray)
    const eventImagesArray = imagesArray['eventImages[]']|| imagesArray['eventImages'];

    // Handle the image file as needed
    const imageUrl = await this.uploadImage(imagesArray["image"][0]);
    let imgsUrls = [];

    if (eventImagesArray?.length > 0) {
      imgsUrls = await Promise.all(eventImagesArray.map(img => this.uploadImage(img)));
    }

    const newEvent = new this.eventModel({
      ...event,
      imageFile: imageUrl, // Update the correct field for image URL in your schema
      imagesArray: imgsUrls
    });

    return newEvent.save();
  }

  private async uploadImage(image: any): Promise<string> {

    if (!this.bucket) {
      console.error('GridFSBucket not initialized.');
      return '';
    }
  
    try {
      const uploadStream = this.bucket.openUploadStream(image?.originalname);
      const fileStream = require('fs').createReadStream(image?.path);
  
      fileStream.pipe(uploadStream);
  
      // Return the Promise directly from uploadStream
      return new Promise((resolve, reject) => {
        uploadStream.on('finish', () => {
          console.log('File upload finished.');
          resolve(uploadStream.id.toString());
        });
        uploadStream.on('error', (error) => {
          console.error('File upload error:', error);
          reject(error);
        });
 
        fileStream.on('error', (error) => {
          console.error('File read stream error:', error);
          reject(error);
        });
      });
    } catch (error) {
      console.error('Error during file upload:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  async getFileStreamById(id: string) {
    if (!this.bucket) {
      console.error('GridFSBucket not initialized.');
      return null;
    }
    const downloadStream = this.bucket.openDownloadStream(new mongoose.Types.ObjectId(id));

    return downloadStream;
  }

  async findAll(): Promise<GeneralEvent[]> {
    return await this.eventModel.find().exec();
  }

  async readById(id): Promise<GeneralEvent> {
    return await this.eventModel.findById(id).exec();
  }


  async update(id, event: any,  imagesArray: any[]): Promise<GeneralEventDto> {
    console.log(imagesArray['eventImages[]']?.length ,"array", imagesArray.length)
    const eventToUpdate = this.eventModel.findById(id).exec();

    if (!eventToUpdate) {
      throw new NotFoundException('Event not found');
    }

    let profileImageUrl = null;
    let imgsUrls = []
    // if cover photo is chosen
    if(imagesArray?.length >0  && imagesArray["image"][0]){
      profileImageUrl = await this.uploadImage(imagesArray["image"][0]); // cover photo
      (await eventToUpdate).imageFile = profileImageUrl;
    }

     // if other photos are chosen
    if (imagesArray['eventImages[]']?.length > 0) {

      let newImgs = await Promise.all(imagesArray['eventImages[]'].map(img => this.uploadImage(img))); 
     
      imgsUrls = (await eventToUpdate).imagesArray.concat(newImgs); 

     (await eventToUpdate).imagesArray = imgsUrls;
      
    }
    (await eventToUpdate).name = event.name;
    (await eventToUpdate).text = event.text;
    (await eventToUpdate).category = event.category;

    await (await eventToUpdate).save();

    return (await eventToUpdate).toObject();

  }

  async delete(id): Promise<any> {
    return await this.eventModel.findByIdAndRemove(id);
  }

  async deleteImageFromEvent(imageId: string, eventId: string){
    console.log(imageId, "IDDDDDDDDDDDDDDDDDDDDD", eventId);
    
    const generalEvent = await this.eventModel.findById(eventId);
    const imagesArray = generalEvent?.imagesArray;
    
    if(imagesArray){

      let index = imagesArray.findIndex((img) => img.toString() === imageId);
    

      if(index === -1){
        return { error: 'Image not found' };
      }

      imagesArray.splice(index, 1);
      await generalEvent.save();
    }
   
  }

  async findByTypeAndCategory(type: string, category: string): Promise<GeneralEvent[]> {
    return this.eventModel.find({ type, category }).exec();
  }

  async deleteComment(eventId, commentId): Promise<any> {
    const generalEvent = await this.eventModel.findById(eventId);
    const comments = generalEvent.comments

    const commentIndex = generalEvent.comments.findIndex(
      (comment) => comment._id.toString() == commentId,
    );

    if (commentIndex === -1) {
      return { error: 'Comment not found' };
    }

    // Remove the comment from the comments array
    comments.splice(commentIndex, 1);

    // Save the updated GeneralEvent document
    await generalEvent.save();
  }

  async addComment(eventId, comment: Comment): Promise<any> {
    const generalEvent = await this.eventModel.findById(eventId);
    const comments = generalEvent.comments
    comments.push(comment);

    await generalEvent.save();
  }


}