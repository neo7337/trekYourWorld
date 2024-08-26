import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactUs, ContactUsSchema } from "./schema/contactUs.schema";
import { ContactUsController } from "./contactUs.controller";
import { ContactUsService } from "./contactUs.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ContactUs.name, schema: ContactUsSchema }
        ]),
    ],
    controllers: [ContactUsController],
    providers: [ContactUsService],
})
export class ContactUsModule { }