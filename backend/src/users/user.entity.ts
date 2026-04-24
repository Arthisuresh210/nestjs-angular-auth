import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  google_id: string | undefined;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string | undefined;

  @Column({ type: 'varchar', length: 500, nullable: true })
  picture: string | undefined;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string | undefined;

  @CreateDateColumn()
  created_at: Date | undefined;
}
