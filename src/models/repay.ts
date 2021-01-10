import { BaseEntity, Column, Entity, PrimaryColumn, OneToOne } from "typeorm";

@Entity({name: "repay"})
export default class Borrow extends BaseEntity {
    @PrimaryColumn({type: "text"})
    id: string;

    @Column({name : "reserve"})
    reserve: string;

    @Column({name : "amt"})
    amount: number;

    @Column({name : "amt_in_eth"})
    amountInEth: number;

    @Column({name : "fee"})
    fee: number;

    @Column({name: "borrow_bal_increase"})
    borrowBalanceIncrease: number;

    @Column({name: "borrow_bal_increase_eth"})
    borrowBalanceIncreaseInEth: number;
}