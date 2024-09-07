import {
  Controller,
  Res,
  HttpStatus,
  HttpException,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';

@Controller('cats')
export default class CatController {
  private API_KEY: string =
    'live_wL1lhvBpxb7qz2jysRWt0Zib1HpKFUJLGjOIMaM5kSqaqRQanMUqGuvWWFSVNP5q';

  @Get()
  async create(@Res() res: Response) {
    try {
      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search?limit=50',
        {
          headers: {
            'x-api-key': this.API_KEY,
          },
        },
      );
      return res.status(HttpStatus.OK).json(response.data);
    } catch (err) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
  }
}
