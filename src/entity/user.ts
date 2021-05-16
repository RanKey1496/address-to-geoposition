import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class UserEntity {

    @PrimaryColumn()
    public username: string;

    @Column()
    public passwordHash: string;

}