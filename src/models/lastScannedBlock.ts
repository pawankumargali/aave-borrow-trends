import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";


@Entity({name: "last_scanned_block"})
export default class LastScannedBlock extends BaseEntity {
    
    @PrimaryColumn({type: "text", name:"id"})
    id: string;

    @Column({name : "block_num"})
    blockNumber: number;

}