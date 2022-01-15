import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { CreateUserDTO, LoginUserDTO } from '../dto/user.dto';
import { AllExceptionsFilter } from '../errors/all-exception.error';
import { User } from '../schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(createUserDTO);
  }

  @Post('login')
  login(@Body() loginUserDTO: LoginUserDTO): Promise<User> {
    return this.userService.login(loginUserDTO);
  }
}
