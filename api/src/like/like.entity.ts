import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  cat_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
