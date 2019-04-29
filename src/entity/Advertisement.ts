import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity()
export class Advertisement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'offer_message' })
    offerMessage: string;

    @Column({ name: 'offer_graphic_url' })
    offerGraphicUrl: string;

    @Column({ name: 'start_datetime' })
    startDatetime: Date;

    @Column({ name: 'end_datetime' })
    endDatetime: Date;

    @Column()
    category: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    @Exclude()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    @Exclude()
    updatedAt: Date;
}
