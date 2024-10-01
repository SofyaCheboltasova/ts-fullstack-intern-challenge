import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Like } from './like.entity';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private repository: Repository<Like>,
  ) {}

  public async getLikes(user_id: number): Promise<Like[] | []> {
    const likes = await this.repository.find({ where: { user_id } });
    return likes;
  }

  public async postLike(likeDto: LikeDto): Promise<Like> {
    const like = this.repository.create(likeDto);
    return await this.repository.save(like);
  }

  public async deleteLike(cat_id: string): Promise<void> {
    const likeId = await this.repository.findOne({ where: { cat_id } });
    await this.repository.delete(likeId);
  }
}
