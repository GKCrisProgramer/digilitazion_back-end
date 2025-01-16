import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Profile } from '../profile/profile'; 
import { Document } from '../document/document'; 

@Entity({ name: 'de_documentxprofile' })
export class DocumentProfile {
    @PrimaryGeneratedColumn()
    ID_DXP: number;

    @ManyToOne(() => Profile, profile => profile.documentProfile, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Profile' })  // La columna que será la clave foránea
    profile: Profile;

    @ManyToOne(() => Document, document => document.documentProfile, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ID_Document' })  // La columna que será la clave foránea
    document: Document;
    
}
