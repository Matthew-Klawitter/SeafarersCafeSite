import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Article } from "./Articles";

@Entity()
export class ArticleType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    typeName: string;

    @OneToMany(type => Article, article => article.type)
    articles: Article[];
}
