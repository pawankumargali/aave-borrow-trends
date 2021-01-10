export const GET_USER_BORROW_RESERVES=`select distinct(borrow.reserve) from txn inner join borrow 
on txn.tx_hash=borrow.id where txn.user_address= ##user_address##;`

export const USER_BORROW_REPAY=`select * from 
(
    select 
	txn.id, txn.time_stamp, txn.tx_hash, txn.tx_type, borrow.reserve, borrow.borrow_amt_eth amt,
 	borrow.borrow_bal_increase_eth borrow_bal_increase
    from 
        txn inner join borrow on txn.tx_hash=borrow.id
    where
        txn.user_address='##user_address##'
    
    union
    
    select 
        txn.id, txn.time_stamp,  txn.tx_hash, txn.tx_type, repay.reserve, repay.amt_in_eth amt,
        repay.borrow_bal_increase_eth borrow_bal_increase
    from
        txn inner join repay on txn.tx_hash=repay.id
    where
        txn.user_address='##user_address##'
) 
as  cumulative_borrow order by time_stamp asc;`

export const USER_RESERVE_BORROW_REPAY = `select * from 
(
    select 
	txn.id, txn.time_stamp, txn.tx_hash, txn.tx_type, borrow.reserve, borrow.borrow_amt_eth amt,
 	borrow.borrow_bal_increase_eth borrow_bal_increase
    from 
        txn inner join borrow on txn.tx_hash=borrow.id
    where
        txn.user_address='##user_address##' and borrow.reserve='##reserve_address##'
    
    union
    
    select 
        txn.id, txn.time_stamp,  txn.tx_hash, txn.tx_type, repay.reserve, repay.amt_in_eth amt,
        repay.borrow_bal_increase_eth borrow_bal_increase
    from
        txn inner join repay on txn.tx_hash=repay.id
    where
        txn.user_address='##user_address##' and repay.reserve='##reserve_address##'
) 
as  cumulative_borrow order by time_stamp asc;`

export const USER_LIQUIDATION = `select 
        txn.id, txn.time_stamp,  txn.tx_hash, txn.tx_type, liquidation_call.reserve,
        liquidation_call.liquidated_col_amt_eth liquidated_col_amt
    from 
        txn inner join liquidation_call on txn.tx_hash=liquidation_call.id 
    where 
        txn.user_address='##user_address##' order by txn.time_stamp asc;`

export const USER_RESERVE_LIQUIDATION = `select 
        txn.id, txn.time_stamp,  txn.tx_hash, txn.tx_type, liquidation_call.reserve,
        liquidation_call.liquidated_col_amt liquidate_col_amt
    from 
        txn inner join liquidation_call on txn.tx_hash=liquidation_call.id 
    where 
        txn.user_address='##user_address##'
    and 
        liquidation_call.reserve = '##reserve_address##' order by txn.time_stamp asc;`