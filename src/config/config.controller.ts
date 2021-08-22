import { Body, Controller, Get, Param, Put, UseFilters } from '@nestjs/common';
import { UpdateConfigDto } from 'src/dto/config.dto';
import { MongoExceptionFilter } from 'src/errors/mongo.error';
import { Config } from 'src/schemas/config.schema';
import { ConfigService } from './config.service';

@Controller('config')
@UseFilters(MongoExceptionFilter)
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
    @Body() updateConfigDto: UpdateConfigDto
  ): Promise<Config> {
    return this.configService.update(id, updateConfigDto);
  }
}
