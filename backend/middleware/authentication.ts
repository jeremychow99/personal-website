import * as jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken"
import express, { Request, Response, NextFunction } from 'express';
import sanitizedConfig from '../config/config';
export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, sanitizedConfig.JWT_SECRET);
        (req as CustomRequest).token = decoded;
        console.log(decoded);
        
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};