import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { TrekDocumentSchema } from './trek.schema';

@Schema({ collection: 'treks_information' })
export class TreksInformation extends Document {
    @Prop()
    org: string;

    @Prop({ type: [TrekDocumentSchema] })
    treks: TrekInformationDocument[];
}

export type TrekInformationDocument = HydratedDocument<TreksInformation>;

export const TrekInformationSchema =
    SchemaFactory.createForClass(TreksInformation);
