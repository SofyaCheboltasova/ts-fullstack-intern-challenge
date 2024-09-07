import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';

import LikeDto from '../dto/like.dto';
import LikeService from '../../../backend/src/service/likeService';

@Controller('likes')
export default class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body() likeDto: LikeDto, @Res() res: Response) {
    try {
      const like = await this.likeService.postLike(likeDto);
      return res.status(HttpStatus.CREATED).json(like);
    } catch (err) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') likeId: number, @Res() res: Response) {
    try {
      await this.likeService.deleteLike(likeId);
      return res.status(HttpStatus.OK);
    } catch (err) {
      throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async get(@Req() req: Request, @Res() res: Response) {
    // const authToken = req.headers['x-auth-token'][0];
    const likes = this.likeService.getLikes(1);
    return res.status(HttpStatus.OK).json(likes);
  }
}
