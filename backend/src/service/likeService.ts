import { Repository } from "typeorm";
import dataSource from "../data-source";
import Like from "../entity/Like";
import LikeDto from "../../../api/src/dto/like.dto";

export default class LikeService {
  private repository: Repository<Like>;

  constructor() {
    this.repository = dataSource.getRepository(Like);
  }

  public async getLikes(user_id: string): Promise<Like[] | []> {
    const likes = await this.repository.find({ where: { user_id } });
    return likes;
  }

  public async postLike(likeDto: LikeDto): Promise<Like> {
    const like = this.repository.create(likeDto);
    return await this.repository.save(like);
  }

  public async deleteLike(like_id: number): Promise<void> {
    await this.repository.delete(like_id);
  }
}

