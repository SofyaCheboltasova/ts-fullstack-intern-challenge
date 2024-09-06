import { Repository } from "typeorm";
import dataSource from "../data-source";
import Like from "../entity/Like";

export default class LikeService {
  private repository: Repository<Like>;

  constructor() {
    this.repository = dataSource.getRepository(Like);
  }

  public async getLikes(): Promise<Like[] | []> {
    const likes = await this.repository.find();
    return likes;
  }

  public async postLike(like: Like): Promise<Like> {
    const newLike = await this.repository.save(like);
    return newLike;
  }

  public async deleteLike(like_id: number): Promise<void> {
    await this.repository.delete(like_id);
  }
}

