import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  login: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  salt: string;
}
