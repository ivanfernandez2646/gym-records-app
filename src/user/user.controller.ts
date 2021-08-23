import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { MongoExceptionFilter } from 'src/errors/mongo.error';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(MongoExceptionFilter)
export class UserController {
  constructor(private readonly markService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.markService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.markService.findOne(id);
  }

  //   @Post()
  //   create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //     return this.markService.create(createUserDto);
  //   }

  //   @Put(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() updateUserDto: UpdateUserDto
  //   ): Promise<User> {
  //     return this.markService.update(id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string): Promise<boolean> {
  //     return this.markService.delete(id);
  //   }
}
