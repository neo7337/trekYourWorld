import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TrekDocument extends Document {
    @Prop()
    uuid: string;

    @Prop()
    title: string;

    @Prop()
    uid: string;

    @Prop()
    url: string;

    @Prop()
    elevation: string;

    @Prop()
    duration: string;

    @Prop()
    cost: string;

    @Prop()
    difficulty: string;

    @Prop()
    location: string;

    @Prop()
    bestTimeToTarget: string[];

    @Prop()
    tags: string[];
}

export const TrekDocumentSchema = SchemaFactory.createForClass(TrekDocument);
