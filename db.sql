-- CREATE TABLES

-- TXNS
create table txn (
	id bigserial primary key not null,
	tx_hash text not null,
	time_stamp bigint not null,
	user_address text not null,
	tx_type text
);

create unique index idx_txns_tx_hash on txn(tx);


-- DEPOSIT
create table deposit (
	id text primary key not null,
	reserve text not null,
	amt double precision,
    amt_in_eth double precision
);

-- BORROW
create table borrow_interest_type (
	id int primary key not null,
	type varchar(25) not null
);
insert into borrow_interest_type values 
(1, 'stable'),
(2, 'variable');

create table borrow (
	id text primary key not null,
	reserve text not null,
	amt double precision,
	fee double precision,
	interest_rate double precision,
	interest_type smallint references borrow_interest_type(id),
	borrow_bal_increase double precision,
    amt_in_eth double precision,
    borrow_bal_increase_eth double precision
);

-- REPAY
create table repay (
	id text primary key not null,
	reserve text not null,
	amt double precision,
	fee double precision,
	borrow_bal_increase double precision,
    amt_in_eth double precision,
	borrow_bal_increase_eth double precision

);

-- LIQUIDATION CALL
create table liquidation_call (
	id text primary key not null,
	reserve text not null,
	col double precision,
    col_in_eth double precision,
	liquidator_address text not null,
	purchase_amt double precision,
	liquidated_col_amt double precision,
    liquidated_col_amt_eth double precision,
	accured_borrow_interest double precision,
	received_a_token boolean 
);


-- LAST SCANNED BLOCK
create table last_scanned_block (
	id text primary key not null,
	block_num bigint
);

insert into last_scanned_block (id, block_num) values 
('deposit', 0),
('borrow', 0),
('repay', 0),
('liquidation_call', 0);

-- -- TXN TYPES
-- create table txn_types (
-- 	id smallint primary key not null,
-- 	tx_type text not null
-- );

-- insert into txn_types (id, tx_type) values
-- (1, 'deposit'),
-- (2, 'borrow'),
-- (3, 'repay'),
-- (4, 'liquidation_call');











select * from 
(select 
	txn.id, txn.time_stamp, txn.tx_hash, txn.tx_type, borrow.reserve, borrow.borrow_amt_eth amt,
 	borrow.borrow_bal_increase_eth borrow_bal_increase
from 
	txn inner join borrow on txn.tx_hash=borrow.id
where
	txn.user_address='0xa25A9b7c73158B3B34215925796Ce6Aa8100C13a'
 
union
 
select 
	txn.id, txn.time_stamp,  txn.tx_hash, txn.tx_type, repay.reserve, repay.amt_in_eth amt,
 	repay.borrow_bal_increase_eth borrow_bal_increase
from
	txn inner join repay on txn.tx_hash=repay.id
where
	txn.user_address='0xa25A9b7c73158B3B34215925796Ce6Aa8100C13a') as  cumulative_borrow
order by time_stamp asc;