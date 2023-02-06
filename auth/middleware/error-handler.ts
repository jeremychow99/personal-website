import { NextFunction } from "express"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
declare interface Error {
    StatusCode?: number
    message: string | undefined
}
export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let customError = {
        // set default
        statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }
    return res.status(customError.statusCode).json({ msg: customError.msg })
}