import {BaseEntity, Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import Borrow from "./borrow";
import LiquidationCall from "./liquidationCall";
import Repay from "./repay";

@Entity({name: "txn"})
export default class Txn extends BaseEntity {
    
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({name: "tx_hash"})
    txHash: string;

    @Column({name : "time_stamp"})
    timestampInMs: number;

    @Column({name : "user_address"})
    userAddress: string;

    @Column({name: "tx_type"})
    txType: string;

    @OneToOne(() => Borrow, (borrow: Borrow) => borrow.id)
    public borrowTx: Borrow;

    @OneToOne(() => Repay, (repay: Repay) => repay.id)
    public repayTx: Repay;

    @OneToOne(() => LiquidationCall, (liqCall: LiquidationCall) => liqCall.id)
    public liquidationTx: LiquidationCall
}
