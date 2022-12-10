import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, Unique, CreateDateColumn } from 'typeorm';
import { User } from './UserEntity';

@Entity()
@Unique(['shortlink','user'])
export class ShortCut {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  shortlink!: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ type: 'tsvector',nullable:true })
  search: any;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne((type) => User, (user) => user.shortcuts)
  user: User;

  @BeforeInsert()
  verifyUrl() {
    try {
      new URL(this.url)
    } catch (error) {
      throw new Error(`${error?.message}`)
    }
  }
}
