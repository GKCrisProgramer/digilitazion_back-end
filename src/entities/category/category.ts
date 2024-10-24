import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Document } from '../document/document'

@Entity({ name: 'ca_category' })
export class Category {
    @PrimaryGeneratedColumn({ name: 'ID_Category'})
    categoryId: number;

    @Column({ name: 'Category_Name', type: 'varchar', length: 100, nullable: false})
    categoryName: string;

    @OneToMany(() => Document, document => document.category)
    document: Document[];
}
