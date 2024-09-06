import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Like from "./Like";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false, unique: true })
  login: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}

