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
import { CreateUserDTO } from 'src/dto/user.dto';
import { AllExceptionsFilter } from 'src/errors/all-exception.error';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(AllExceptionsFilter)
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

  @Post()
  create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.markService.create(createUserDTO);
  }
}
