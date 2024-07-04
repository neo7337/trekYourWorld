import { Controller, Get } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { Organisations } from './schemas/orgs.schema';

@Controller('orgs')
export class OrgsController {
    constructor(private readonly orgsService: OrgsService) { }

    @Get()
    findAllOrganisations(): Promise<Organisations[]> {
        return this.orgsService.findAllOrganisations();
    }
}
