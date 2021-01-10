import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import {PORT, DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD} from "./config";
import { getAaveBorrowHistory, getAaveRepayHistory, getAaveLiquidationHistory } from "./utils/aaveEventsData";
import  borrowRouter from "./routes/borrow";

const app = express();

createConnection({
    type:"postgres",
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    synchronize: false,
    logging: false,
    entities: [
        "dist/models/*.js"
    ]
}).then(() => console.log("Connected to DB..."));

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

app.get('/', (req: Request, res: Response) => res.json({status:'Running'}));

app.use('/borrow/', borrowRouter);


const  _delayedFunctionCall = async (func: Function,  delay: number) => setTimeout(() => func(), delay)
const ONE_HOUR=1*60*60*1000;
const _getEntryUpdateDate = () => (new Date()).toString();

_delayedFunctionCall(getAaveBorrowHistory, ONE_HOUR)
    .then(
        () => _delayedFunctionCall(getAaveRepayHistory, ONE_HOUR)
                .then(
                    () => _delayedFunctionCall(getAaveLiquidationHistory, ONE_HOUR)
                            .then(() => console.log(`updated entries for borrow, repay liquidation upto ${_getEntryUpdateDate()}`))
                            .catch(err => console.log(err))
                )
                .catch((err) => console.log(err))
    )
    .catch(err => console.log(err));