import Web3 from "web3";
import { createQueryBuilder } from "typeorm"
import aaveContract from "./aaveContract";
import { getTokenHistoricalExPriceInEth } from "./coinExPrices";
import { WEB3_PROVIDER_URL } from "../config";
import tokens from "./tokens";
import Txn from "../models/txn";
import Borrow from "../models/borrow";
import Repay from "../models/repay";
import LastScannedBlock from "../models/lastScannedBlock";
import LiquidationCall from "../models/liquidationCall";

const web3 = new Web3(new Web3.providers.HttpProvider(WEB3_PROVIDER_URL));
const aave = new web3.eth.Contract(aaveContract.abi, aaveContract.address);
const TIME_INTERVAL=366*24*60*60*1000;

export async function getAaveBorrowHistory() {
    try {
        const latest = await web3.eth.getBlockNumber();
        const { blockNumber } = await LastScannedBlock.findOne({
            where: { id: "borrow" }
        });
        let startBlock = blockNumber!=0 ? blockNumber : latest-10000000;
        console.log(startBlock);
        const now = new Date().valueOf();
        while(startBlock<=latest) {
            const endBlock = startBlock+5000>latest ? latest : startBlock+5000;
            const result = await aave.getPastEvents("Borrow", { fromBlock: startBlock, toBlock: endBlock});
            startBlock+=5000;
            for(const evt of result) {
                const txnRecord = await Txn.findOne({ txHash: evt.transactionHash })
                if(!txnRecord) {
                    const { 
                        _timestamp, 
                        _reserve, 
                        _user, 
                        _amount, 
                        _originationFee, 
                        _borrowRate, 
                        _borrowRateMode, 
                        _borrowBalanceIncrease 
                    } = evt.returnValues;
                    const evtDate = new Date(_timestamp*1000).valueOf();
                    if(now-evtDate<=TIME_INTERVAL) {
                        const decimals = tokens[_reserve] ? tokens[_reserve].decimals : 18;
                        const borrowAmt = (_amount/(Math.pow(10,decimals)));
                        const tokenPriceInEth = await getTokenHistoricalExPriceInEth(_reserve.toLowerCase(), _timestamp*1000);
                        if(!tokenPriceInEth || isNaN(tokenPriceInEth)) continue;
                        const borrowAmtEth = borrowAmt*tokenPriceInEth;
                        const borrowIncrease = (_borrowBalanceIncrease/(Math.pow(10, decimals)));
                        const borrowIncreaseInEth = borrowIncrease*tokenPriceInEth;
                        const txnEntry = { 
                            txHash: evt.transactionHash, 
                            userAddress: _user, 
                            timestampInMs: _timestamp*1000,
                            txType: "borrow"
                        };
                        const newTxn = Object.assign(new Txn(), txnEntry);
                        const borrowEntry = { 
                            id: evt.transactionHash, 
                            reserve: _reserve, 
                            borrowAmt:borrowAmt,
                            borrowAmtEth: borrowAmtEth,
                            fee: _originationFee ? _originationFee : 0,
                            interestRate: _borrowRate/Math.pow(10,27),
                            interestRateType: _borrowRateMode,
                            borrowBalanceIncrease: borrowIncrease,
                            borrowBalanceIncreaseInEth: borrowIncreaseInEth
                        }
                        const newBorrow = Object.assign(new Borrow(), borrowEntry);
                        await Promise.all([
                            Borrow.save(newBorrow),
                            Txn.save(newTxn)
                        ]);
                    }
                }
            }
            await createQueryBuilder()
            .update(LastScannedBlock)
            .set({ blockNumber: endBlock })
            .where("id = :id", { id: "borrow" })
            .execute();
        }
        await createQueryBuilder()
            .update(LastScannedBlock)
            .set({ blockNumber: latest-5000 })
            .where("id = :id", { id: "borrow" })
            .execute();
        
    }
    catch(err) {
        console.log(err);
    }
}

export async function getAaveRepayHistory() {
    try {
        const latest = await web3.eth.getBlockNumber();
        const { blockNumber } = await LastScannedBlock.findOne({
            where: { id: "repay" }
        });
        let startBlock = blockNumber!=0 ? blockNumber : latest-10000000;
        console.log(startBlock);
        const now = new Date().valueOf();
        while(startBlock<=latest) {
            const endBlock = startBlock+5000>latest ? latest : startBlock+5000;
            const result = await aave.getPastEvents("Repay", { fromBlock: startBlock, toBlock: endBlock});
            startBlock+=5000;
            for(const evt of result) {
                const txnRecord = await Txn.findOne({ txHash: evt.transactionHash })
                if(!txnRecord) {
                    const { 
                        _timestamp, 
                        _reserve, 
                        _user, 
                        _amountMinusFees, 
                        _fees, 
                        _borrowBalanceIncrease
                    } = evt.returnValues;
                    const evtDate = new Date(_timestamp*1000).valueOf();
                    if(now-evtDate<=TIME_INTERVAL) {
                        const decimals = tokens[_reserve] ? tokens[_reserve].decimals : 18;
                        const amt = (_amountMinusFees/(Math.pow(10,decimals)));
                        const tokenPriceInEth = await getTokenHistoricalExPriceInEth(_reserve.toLowerCase(), _timestamp*1000);
                        if(!tokenPriceInEth || isNaN(tokenPriceInEth)) continue;
                        const amtInEth = amt*tokenPriceInEth;
                        const borrowIncrease = (_borrowBalanceIncrease/(Math.pow(10,decimals)));
                        const borrowIncreaseInEth = borrowIncrease*tokenPriceInEth;
                        const txnEntry = { 
                            txHash: evt.transactionHash, 
                            userAddress: _user, 
                            timestampInMs: _timestamp*1000,
                            txType: "repay"
                        };
                        const newTxn = Object.assign(new Txn(), txnEntry);
                        const repayEntry = { 
                            id: evt.transactionHash, 
                            reserve: _reserve, 
                            amount: amt,
                            fee: _fees ? _fees : 0,
                            amountInEth: amtInEth,
                            borrowBalanceIncrease: borrowIncrease,
                            borrowBalanceIncreaseInEth: borrowIncreaseInEth
                        }
                        const newRepay = Object.assign(new Repay(), repayEntry);
                        await Promise.all([
                            Repay.save(newRepay),
                            Txn.save(newTxn)
                        ]);
                    }
                }
            }
            await createQueryBuilder()
            .update(LastScannedBlock)
            .set({ blockNumber: endBlock })
            .where("id = :id", { id: "repay" })
            .execute();
        }
        await createQueryBuilder()
            .update(LastScannedBlock)
            .set({ blockNumber: latest-5000 })
            .where("id = :id", { id: "repay" })
            .execute();
    }
    catch(err) {
        console.log(err);
    }
}


export async function getAaveLiquidationHistory() {
    try {
        const latest = await web3.eth.getBlockNumber();
        const { blockNumber } = await LastScannedBlock.findOne({
            where: { id: "liquidation_call" }
        });
        let startBlock = blockNumber!=0 ? blockNumber : latest-10000000;
        console.log(startBlock);
        const now = new Date().valueOf();
        while(startBlock<=latest) {
            const endBlock = startBlock+5000>latest ? latest : startBlock+5000;
            const result = await aave.getPastEvents("LiquidationCall", { fromBlock: startBlock, toBlock: endBlock});
            startBlock+=5000;
            for(const evt of result) {
                const txnRecord = await Txn.findOne({ txHash: evt.transactionHash })
                if(!txnRecord) {
                    const { 
                        _timestamp,
                        _collateral, 
                        _reserve, 
                        _user, 
                        _purchaseAmount, 
                        _liquidatedCollateralAmount, 
                        _accuredBorrowInterest,
                        _liquidator,
                        _receiveAToken
                    } = evt.returnValues;
                    const evtDate = new Date(_timestamp*1000).valueOf();
                    if(now-evtDate<=TIME_INTERVAL) {
                        const tokenDecimals = tokens[_reserve] ? tokens[_reserve].decimals : 18;
                        const colDecimals = tokens[_collateral] ? tokens[_collateral].decimals : 18;
                        const [tokenPriceInEth, colPriceInEth] = await Promise.all([
                            getTokenHistoricalExPriceInEth(_reserve.toLowerCase(), _timestamp*1000),
                            getTokenHistoricalExPriceInEth(_collateral.toLowerCase(), _timestamp*1000),
                        ]);
                        if(!tokenPriceInEth || isNaN(tokenPriceInEth) || !colPriceInEth || isNaN(colPriceInEth)) continue;
                        const liquidatedColAmt = (_liquidatedCollateralAmount/(Math.pow(10,colDecimals)));
                        const liquidatedColAmtInEth = liquidatedColAmt*colPriceInEth;
                        const purchaseAmt = (_purchaseAmount/(Math.pow(10,tokenDecimals)));
                        const purchaseAmtInEth = purchaseAmt*tokenPriceInEth;
                        const txnEntry = { 
                            txHash: evt.transactionHash, 
                            userAddress: _user, 
                            timestampInMs: _timestamp*1000,
                            txType: "liquidation"
                        };
                        const newTxn = Object.assign(new Txn(), txnEntry);
                        const liquidationCallEntry = { 
                            id: evt.transactionHash, 
                            reserve: _reserve, 
                            col: _collateral,
                            liquidatorAddress: _liquidator,
                            purchaseAmount: purchaseAmt,
                            purchaseAmountInEth: purchaseAmtInEth ? purchaseAmtInEth : NaN,
                            liquidatedColAmount: liquidatedColAmt,
                            liquidatedColAmountInEth: liquidatedColAmtInEth ? liquidatedColAmtInEth : NaN,
                            accuredInterest: _accuredBorrowInterest/Math.pow(10,27),
                            receivedAToken: _receiveAToken
                        }
                        const newLiquidationCall = Object.assign(new LiquidationCall(), liquidationCallEntry);
                        await Promise.all([
                            LiquidationCall.save(newLiquidationCall),
                            Txn.save(newTxn)
                        ]);
                    }
                }
            }
            await createQueryBuilder()
            .update(LastScannedBlock)
            .set({ blockNumber: endBlock })
            .where("id = :id", { id: "liquidation_call" })
            .execute();
        }
        await createQueryBuilder()
            .update(LastScannedBlock)
            .set({ blockNumber: latest-5000 })
            .where("id = :id", { id: "liquidation_call" })
            .execute();
    }
    catch(err) {
        console.log(err);
    }
}


export async function getUserCurrentState(userId: string) {
    try {
        const state = await aave.methods.getUserAccountData(userId).call();
        const { 
            totalCollateralETH, 
            totalBorrowsETH, 
            totalFeesETH,
            healthFactor, 
            ltv: loanToValue, 
            currentLiquidationThreshold,
        } = state;
        const decimals = tokens["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"].decimals;
        const net_col=(totalCollateralETH)/(Math.pow(10,decimals));
        const net_borrow=(totalBorrowsETH)/(Math.pow(10,decimals));
        const net_fees=(totalFeesETH)/(Math.pow(10,decimals));
        const hf=(healthFactor)/(Math.pow(10,decimals));
        const max_liquidation = currentLiquidationThreshold/100;
        const ltv= loanToValue/100;
        return   { net_col, net_borrow, net_fees, hf, max_liquidation, ltv };
    }
    catch(err) {
        console.log(err);
    }
}

export async function getUserCurrentStateByReserve(userId: string, reserveId: string) {
    try {
        const state = await aave.methods.getUserReserveData(reserveId, userId).call();
        const { currentBorrowBalance, lastUpdateTimestamp } = state;
        const decimals= tokens["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"].decimals;
        const net_borrow=(currentBorrowBalance)/(Math.pow(10, decimals));
        const last_updated=lastUpdateTimestamp*1000;
        return { net_borrow, last_updated };
    }
    catch(err) {
        console.log(err);
    }
}