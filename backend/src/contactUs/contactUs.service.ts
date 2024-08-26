import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ContactUs } from "./schema/contactUs.schema";
import { Model } from "mongoose";
import { CreateContactUsDto } from "@/types/dto/contactUs/ContactUs.dto";

@Injectable()
export class ContactUsService {
    constructor(
        @InjectModel(ContactUs.name) private contactUsModel: Model<ContactUs>
    ) {}

    async createContactUsEntry(createContactUsDto: CreateContactUsDto) {
        console.log(createContactUsDto)
        const createContactUsEntry = new this.contactUsModel(createContactUsDto)
        await createContactUsEntry.save()
    }
}