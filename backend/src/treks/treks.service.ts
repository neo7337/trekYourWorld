import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TreksInformation } from './schemas/treksInformation.schema';
import { Model } from 'mongoose';
import { TrekSearchDto } from './dto/trekSeach.dto';

@Injectable()
export class TreksService {
  constructor(
    @InjectModel(TreksInformation.name)
    private trekInformationModel: Model<TreksInformation>,
  ) {}

  async findAll(): Promise<TreksInformation[]> {
    return this.trekInformationModel.find().exec();
  }

  async findByTrekName(trekName: string): Promise<TrekSearchDto[]> {
    const pipeline = [
      {
        $unwind: '$treks',
      },
      {
        $match: {
          'treks.title': {
            $regex: new RegExp(trekName),
          },
        },
      },
      {
        $project: {
          _id: 0,
          org: 1,
          title: '$treks.title',
          uuid: '$treks.uuid',
        },
      },
    ];
    const response = await this.trekInformationModel.aggregate(pipeline).exec();
    return response.map(
      (trekInfo) =>
        <TrekSearchDto>{
          org: trekInfo.org,
          title: trekInfo.title,
          uuid: trekInfo.uuid,
        },
    );
  }
}
