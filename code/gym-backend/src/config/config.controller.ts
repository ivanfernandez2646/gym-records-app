import { Body, Controller, Get, Param, Put, UseFilters } from '@nestjs/common';
import { UpdateConfigDTO } from '../dto/config.dto';
import { AllExceptionsFilter } from '../errors/all-exception.error';
import { Config } from '../schemas/config.schema';
import { ConfigService } from './config.service';

@Controller('config')
@UseFilters(AllExceptionsFilter)
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  findAll(): Promise<Config[]> {
    return this.configService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Config> {
    return this.configService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfigDto: UpdateConfigDTO
  ): Promise<Config> {
    return this.configService.update(id, updateConfigDto);
  }
}
