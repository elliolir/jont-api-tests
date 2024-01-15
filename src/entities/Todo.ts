import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity
} from "typeorm"

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  value: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}