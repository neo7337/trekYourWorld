import { Controller, Get, Query } from '@nestjs/common';
import { TreksService } from './treks.service';
import { TrekSearchDto } from '@/types/dto/treks/TrekSearch.dto';

@Controller('treks')
export class TreksController {
    constructor(private readonly treksService: TreksService) { }

    @Get()
    findAll(): Promise<string[]> {
        return this.treksService.findAll();
    }

    @Get('search')
    findByTrekName(
        @Query('trekName') trekName?: string,
    ): Promise<TrekSearchDto[]> {
        return this.treksService.handleTrekSearch(trekName);
    }
}
