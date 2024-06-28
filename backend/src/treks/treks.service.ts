import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TreksInformation } from './schemas/treksInformation.schema';
import { Model } from 'mongoose';
import { TrekSearchDto } from '@/types/dto/TrekSearch.dto';

@Injectable()
export class TreksService {
  constructor(
    @InjectModel(TreksInformation.name)
    private trekInformationModel: Model<TreksInformation>,
  ) {}

  async findAll(): Promise<string[]> {
    const pipeline = [
      {
        $unwind: '$treks',
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
    const resultsArr = response.map((item) => `${item.title}`);
    return resultsArr
      .filter((item, index) => resultsArr.indexOf(item) === index)
      .sort();
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
