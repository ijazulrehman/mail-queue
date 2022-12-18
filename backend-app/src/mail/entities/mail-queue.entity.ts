import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('mail_queue', { schema: 'public' })
export class MailQueue {
  @PrimaryColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  mail_qty: number;

  @Column({
    nullable: false,
    default: 'pending',
  })
  status: string;
}
