import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TreksService } from './treks.service';
import { TrekSearchDto } from '@/types/dto/treks/TrekSearch.dto';
import { TrekFilters } from '@/types/generic/TrekFilters';

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

    @Post('filter')
    filterTreks(
        @Body() input: TrekFilters,
    ): Promise<TrekSearchDto[]> {
        return this.treksService.filterTreks(input);
    }
}
