import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import UserDto from '../dto/user.dto';
import UserService from '../../../backend/src/service/userService';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() userDto: UserDto, @Res() res: Response) {
    try {
      const { user, token } = await this.userService.postUser(userDto);
      res.setHeader('X-Auth-Token', token);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (err) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
  }
}
