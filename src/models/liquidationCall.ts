import { BaseEntity, Column, Entity, PrimaryColumn, OneToOne } from "typeorm";

@Entity({name: "liquidation_call"})
export default class LiquidationCall extends BaseEntity {
    
    @PrimaryColumn({type: "text", name: "id"})
    id: string;

    @Column({name : "reserve"})
    reserve: string;

    @Column({name : "col"})
    col: number;

    @Column({name: "liquidator_address"}) 
    liquidatorAddress: string;

    @Column({name : "purchase_amt"})
    purchaseAmount: number;
    
    @Column({name : "purchase_amt_eth"})
    purchaseAmtInEth: number;

    @Column({name : "liquidated_col_amt"})
    liquidatedColAmount: number;

    @Column({name : "liquidated_col_amt_eth"})
    liquidatedColAmountInEth: number;

    @Column({name : "accured_borrow_interest"})
    accuredInterest: number;

    @Column({name: "received_a_token"})
    receivedAToken: boolean;

}