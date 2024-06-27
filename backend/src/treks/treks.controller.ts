import { Controller, Get, Query } from '@nestjs/common';
import { TreksService } from './treks.service';
import { TreksInformation } from './schemas/treksInformation.schema';
import { TrekSearchDto } from './dto/trekSeach.dto';

@Controller('treks')
export class TreksController {
  constructor(private readonly treksService: TreksService) {}

  @Get()
  findAll(): Promise<TreksInformation[]> {
    return this.treksService.findAll();
  }

  @Get('search')
  findByTrekName(
    @Query('trekName') trekName?: string,
  ): Promise<TrekSearchDto[]> {
    return this.treksService.findByTrekName(trekName);
  }
}
