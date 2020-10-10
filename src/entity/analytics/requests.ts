import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Request {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    session: string;

    @Column()
    method: string;

    @Column()
    url: string;

}
