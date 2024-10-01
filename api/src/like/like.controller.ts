import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { LikeDto } from './dto/like.dto';
import { LikeService } from './like.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('likes')
@UseGuards(AuthGuard)
export class LikeController {
  constructor(@Inject(LikeService) private likeService: LikeService) {}

  @Post()
  async create(
    @Body() likeDto: LikeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = req['userId'];
      const like = await this.likeService.postLike({
        ...likeDto,
        user_id: userId,
      });
      return res.status(HttpStatus.CREATED).json(like);
    } catch (err) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') catId: string, @Res() res: Response) {
    try {
      await this.likeService.deleteLike(catId);
      return res.status(HttpStatus.OK).send();
    } catch (err) {
      throw new HttpException('Like not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async get(@Req() req: Request, @Res() res: Response) {
    const userId = req['userId'];
    const likes = await this.likeService.getLikes(userId);
    return res.status(HttpStatus.OK).json(likes);
  }
}
