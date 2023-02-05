import { User } from '../models/user';
import StatusCodes from 'http-status-codes';
import express, { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    console.log(req.body);
    
}

export {
    register
}