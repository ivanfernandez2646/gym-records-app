import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
} from 'class-validator';
import { CreateConfigDTO } from './config.dto';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmptyObject()
  config: CreateConfigDTO;
}
