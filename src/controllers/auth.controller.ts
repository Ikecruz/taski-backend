import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import AuthService from "../services/auth.service";
import HttpException from "../utils/exception";

export default class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService()
    }

    public register = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const res = await this.authService.register(request.body)
            response.status(StatusCodes.OK).send(res)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    public login = async (request: Request, response: Response) => {
    }

}