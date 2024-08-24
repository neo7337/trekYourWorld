import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ collection: 'contact_us'})
export class ContactUs extends Document {
    @Prop()
    firstName: string;

    @Prop()
    lastName?: string;

    @Prop()
    email: string;

    @Prop()
    message: string;
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);

ContactUsSchema.set('timestamps', true)