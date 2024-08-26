import { Body, Controller, Post } from "@nestjs/common";
import { ContactUsService } from "./contactUs.service";
import { CreateContactUsDto } from "@/types/dto/contactUs/ContactUs.dto";

@Controller('contact')
export class ContactUsController {
    constructor(private readonly contactUsSvc: ContactUsService) {}

    @Post()
    async createContact(@Body() createContactUsDto: CreateContactUsDto): Promise<void> {
        await this.contactUsSvc.createContactUsEntry(createContactUsDto)
    }
}