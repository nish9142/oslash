import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ShortCut } from './ShortcutEntity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique:true})
  username!: string;

  @Column()
  password!: string;

  @OneToMany((type) => ShortCut, (shortcuts) => shortcuts.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  shortcuts: ShortCut[];
}
