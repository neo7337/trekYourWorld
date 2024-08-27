import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ContactUsService } from "./contactUs.service";
import { CreateContactUsDto } from "@/types/dto/contactUs/ContactUs.dto";
import { MongooseError } from "mongoose";
import { ResponseHandler } from "src/ResponseHandler";

@Controller('contact')
export class ContactUsController {
    constructor(private readonly contactUsSvc: ContactUsService) { }

    @Post()
    @HttpCode(200)
    async createContact(@Body() createContactUsDto: CreateContactUsDto): Promise<ResponseHandler> {
        try {
            await this.contactUsSvc.createContactUsEntry(createContactUsDto)
            return new ResponseHandler('Successfully Submitted!')
        } catch (error) {
            if (error instanceof MongooseError) {
                // Handle Mongoose-specific errors
                throw new HttpException('Database Error', HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                // General error handling
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }
        }
    }
}