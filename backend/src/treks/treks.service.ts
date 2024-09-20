import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TreksInformation } from './schemas/treksInformation.schema';
import { Model } from 'mongoose';
import { TrekSearchDto } from '@/types/dto/treks/TrekSearch.dto';
import _ from 'underscore';
import { TrekFilters } from '@/types/generic/TrekFilters';

@Injectable()
export class TreksService {
    constructor(
        @InjectModel(TreksInformation.name)
        private trekInformationModel: Model<TreksInformation>,
    ) { }

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

    async handleTrekSearch(trekName: string): Promise<TrekSearchDto[]> {
        if (trekName == "") {
            return this.findAllTreksData();
        } else {
            return this.findByTrekName(trekName);
        }
    }

    async findAllTreksData(): Promise<TrekSearchDto[]> {
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
                    url: '$treks.url',
                    elevation: '$treks.elevation',
                    duration: '$treks.duration',
                    cost: '$treks.cost',
                    difficulty: '$treks.difficulty',
                    location: '$treks.location'
                },
            },
        ];
        const response = await this.trekInformationModel.aggregate(pipeline).exec();
        const mappedResponse = response.map(
            (trekInfo) =>
                <TrekSearchDto>{
                    org: trekInfo.org,
                    title: trekInfo.title,
                    uuid: trekInfo.uuid,
                    url: trekInfo.url,
                    elevation: trekInfo.elevation,
                    duration: trekInfo.duration,
                    cost: trekInfo.cost,
                    difficulty: trekInfo.difficulty,
                    location: trekInfo.location
                },
        );
        return _.sortBy(mappedResponse, 'title');
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
                    url: '$treks.url',
                    elevation: '$treks.elevation',
                    duration: '$treks.duration',
                    cost: '$treks.cost',
                    difficulty: '$treks.difficulty',
                    location: '$treks.location'
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
                    url: trekInfo.url,
                    elevation: trekInfo.elevation,
                    duration: trekInfo.duration,
                    cost: trekInfo.cost,
                    difficulty: trekInfo.difficulty,
                    location: trekInfo.location
                },
        );
    }

    async filterTreks(filterInfo: TrekFilters): Promise<TrekSearchDto[]> {
        const generatedQuery = this.buildFilterQuery(filterInfo)
        const pipeline = [
            {
                $unwind: '$treks',
            },
            {
                $match: generatedQuery
            },
            {
                $project: {
                    _id: 0,
                    org: 1,
                    title: '$treks.title',
                    uuid: '$treks.uuid',
                    url: '$treks.url',
                    elevation: '$treks.elevation',
                    duration: '$treks.duration',
                    cost: '$treks.cost',
                    difficulty: '$treks.difficulty',
                    location: '$treks.location'
                },
            },
        ];
        const response = await this.trekInformationModel.aggregate(pipeline).exec()
        return response.map(
            (trekInfo) =>
                <TrekSearchDto>{
                    org: trekInfo.org,
                    title: trekInfo.title,
                    uuid: trekInfo.uuid,
                    url: trekInfo.url,
                    elevation: trekInfo.elevation,
                    duration: trekInfo.duration,
                    cost: trekInfo.cost,
                    difficulty: trekInfo.difficulty,
                    location: trekInfo.location
                },
        );
    }

    buildFilterQuery(filterInfo: TrekFilters) {
        const query: any = {}

        if (filterInfo.organiser && filterInfo.organiser.length > 0) {
            query.org = { $in: filterInfo.organiser }
        }

        if (filterInfo.location && filterInfo.location.length > 0) {
            query['treks.location'] = { $in: filterInfo.location }
        }

        if (filterInfo.duration && filterInfo.duration.length > 0) {
            query['treks.duration'] = { $in: filterInfo.duration }
        }

        if (filterInfo.difficulty && filterInfo.difficulty.length > 0) {
            query['treks.difficulty'] = { $in: filterInfo.difficulty }
        }

        return query
    }
}
