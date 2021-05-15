import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class UserEntity {

    @PrimaryColumn({ length: 50 })
    public username: string;

    @Column({ length: 100 })
    public passwordHash: string;

}