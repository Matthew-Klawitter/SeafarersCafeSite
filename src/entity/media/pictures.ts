import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Article } from "./Articles";

@Entity()
export class Picture {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(type => Article, article => article.pictures)
    article: Article;

}
