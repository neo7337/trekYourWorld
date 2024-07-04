import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Organisations, OrganisationSchema } from './schemas/orgs.schema';
import { OrgsController } from './orgs.controller';
import { OrgsService } from './orgs.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Organisations.name, schema: OrganisationSchema },
        ]),
    ],
    controllers: [OrgsController],
    providers: [OrgsService],
})
export class OrgsModule { }
