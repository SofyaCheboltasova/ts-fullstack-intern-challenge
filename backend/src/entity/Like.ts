import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import User from "./User";

@Entity()
export default class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  cat_id: string;

  @Column({ type: "varchar" })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  user: User;
}

