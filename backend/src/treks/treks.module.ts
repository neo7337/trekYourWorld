import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TrekInformationSchema,
  TreksInformation,
} from './schemas/treksInformation.schema';
import { TreksService } from './treks.service';
import { TreksController } from './treks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TreksInformation.name,
        schema: TrekInformationSchema,
      },
    ]),
  ],
  providers: [TreksService],
  controllers: [TreksController],
})
export class TreksModule {}
