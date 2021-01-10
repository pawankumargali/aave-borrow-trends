
import { Request, Response } from "express"
import { getConnection } from "typeorm";
import { USER_BORROW_REPAY, USER_LIQUIDATION, USER_RESERVE_BORROW_REPAY, USER_RESERVE_LIQUIDATION  } from "../utils/dbQueries";
import { getUserCurrentState, getUserCurrentStateByReserve } from "../utils/aaveEventsData";

export async function getUserBorrowData(req: Request, res: Response) {
    try {
        const { userId } = req.params; 
        const { reserveId } = req.query;
        if(!userId)
            return res.json({status:400, error:'route parameter userId is missing'});
        let query: string;
        if(!reserveId)
            query = USER_BORROW_REPAY.replace(/##user_address##/g, userId);
        else {
            query = USER_RESERVE_BORROW_REPAY.replace(/##user_address##/g, userId);
            query = query.replace(/##reserve_address##/g, reserveId);
        }

        const userBorrowTable = await getConnection().query(query);
        let netBorrowAmt=0;
        for(const entry of userBorrowTable) {
            const { amt, borrow_bal_increase, tx_type } = entry;
            if(tx_type==='borrow')
                netBorrowAmt+=amt;
            else if(tx_type==='repay')
                netBorrowAmt-=amt;
            netBorrowAmt+=borrow_bal_increase;
            entry.net_borrow=netBorrowAmt;
        }

        let userLiquidations: any;
        let liquidationQuery: string;
        if(!reserveId) 
            liquidationQuery = USER_LIQUIDATION.replace(/##user_address##/g, userId);
        else {
            liquidationQuery = USER_RESERVE_LIQUIDATION.replace(/##user_address##/g, userId);
            liquidationQuery = liquidationQuery.replace(/##reserve_address##/g, reserveId);
        }
        userLiquidations = await getConnection().query(liquidationQuery);
        const userCurrentState = !reserveId ?
            await getUserCurrentState(userId) :
            await getUserCurrentStateByReserve(userId, reserveId);
        return res.json({
            status:200, 
            data: { 
                liquidation_history: userLiquidations, 
                borrow_history: userBorrowTable,
                current: userCurrentState
            }
        });
    }
    catch(err) {
        console.log(err);
        return   res.status(500).json({error: err});
    }
}