import {Request, Response, NextFunction} from "express";
import { API_KEY } from "../config";
export function isAuth(req: Request, res: Response, next: NextFunction) {
    const { key } = req.query;
    if(key===API_KEY)
        return next();
    return res.json({ status:403, message: 'Invalid API Key'});

}