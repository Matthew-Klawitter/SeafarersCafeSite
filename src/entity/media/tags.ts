import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Article } from "./articles";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    session: string;

    @Column()
    method: string;

    @Column()
    url: string;

    @ManyToOne(type => Article, article => article.tags)
    article: Article;
}
