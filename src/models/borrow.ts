import { BaseEntity, Column, Entity, PrimaryColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "borrow"})
export default class Borrow extends BaseEntity {
    
    @PrimaryColumn({type: "text"})
    id: string;

    @Column({name : "reserve"})
    reserve: string;

    @Column({name : "borrow_amt"})
    borrowAmt: number;

    @Column({name : "borrow_amt_eth"})
    borrowAmtEth: number;

    @Column({name : "fee"})
    fee: number;

    @Column({name : "interest_rate"})
    interestRate: number;

    @Column({name: "interest_type"}) 
    interestRateType: number;

    @Column({name: "borrow_bal_increase"})
    borrowBalanceIncrease: number;

    @Column({name: "borrow_bal_increase_eth"})
    borrowBalanceIncreaseInEth: number;
 
}