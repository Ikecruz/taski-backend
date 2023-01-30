import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import AuthService from "../services/auth.service";

export default class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService()
    }

    public login = async (req: Request, res: Response) => {
        
        const user = await this.authService.login(req.body)
        res.status(StatusCodes.OK).send(user)

    }

}