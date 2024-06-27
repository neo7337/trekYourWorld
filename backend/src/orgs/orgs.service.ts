import { Injectable } from '@nestjs/common';
import { Organisations } from './schemas/orgs.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrgsService {
  constructor(
    @InjectModel(Organisations.name) private orgModel: Model<Organisations>,
  ) {}

  findAllOrganisations(): Promise<Organisations[]> {
    return this.orgModel.find().exec();
  }
}
