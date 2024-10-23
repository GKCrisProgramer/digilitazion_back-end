import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Document } from '../document/document'

@Entity({ name: 'ca_category' })
export class Category {
    @PrimaryGeneratedColumn({})
    ID_Category: number;

    @Column({ type: 'varchar', length: 100, nullable: false})
    Category_Name: string;

    @OneToMany(() => Document, document => document.category)
    document: Document[]
}
