import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
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
      return res
        .setHeader('X-Auth-Token', token)
        .status(HttpStatus.CREATED)
        .json(user);
    } catch (err) {
      console.error(err);
      return res.status(HttpStatus.OK).json({ error: err.message });
    }
  }
}
