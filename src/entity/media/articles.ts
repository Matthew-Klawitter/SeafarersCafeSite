import { POINT_CONVERSION_UNCOMPRESSED } from "constants";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {ArticleType} from "./ArticleType";
import {Picture} from "./Pictures";
import {Tag} from "./Tags";

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column()
    published: boolean;

    @Column()
    publishedDate: Date;

    @ManyToOne(type => ArticleType, articleType => articleType.articles)
    type: ArticleType;

    @OneToMany(type => Picture, picture => picture.article)
    pictures: Picture[];

    @OneToMany(type => Tag, tag => tag.article)
    tags: Tag[];
}
