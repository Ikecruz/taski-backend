import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import HttpException from "../utils/exception";

export const authMiddleware:RequestHandler = async ( 
    req: Request, 
    res: Response ,
    next: NextFunction 
) => {

    const token = req.headers.authorization?.split(' ')[1]
    const userService = new UserService()
    const authService = new AuthService()

    if (!token) {
        throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            'Unauthorized'
        )
    }

    const userPayload = authService.verifyJwt(token)
    
    if (!userPayload) {
        throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            'Invalid Token'
        )
    }

    const user = await userService.findById(userPayload.id)

    req.authUser = user

    next()

}