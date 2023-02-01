import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import db from "../database"
import { CreateUserDto } from '../dtos/create-user.dto';
import HttpException from '../utils/exception';
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET_KEY, SECRET_KEY } from '../config';
import UserService from './user.service';
import OtpService from './otp.service';
import { PrismaClient } from '@prisma/client';

export default class AuthService {

    private ormService: PrismaClient;
    private userService: UserService;
    private otpServie: OtpService;

    constructor () {
        this.otpServie = new OtpService()
        this.userService = new UserService()
        this.ormService = db.getClient()
    }

    public async register(createUserDto: CreateUserDto) {
        const userByEmail = await this.userService.findByEmail(createUserDto.email)

        if (userByEmail) {
            throw new HttpException(
                StatusCodes.CONFLICT,
                'Email already in use'
            )
        }

        const userByName = await this.userService.findByUsername(createUserDto.user_name)

        if (userByName) {
            throw new HttpException(
                StatusCodes.CONFLICT,
                'Username already in use'
            )
        }    
        
        const user = await this.ormService.user.create({
            data: {
                user_name: createUserDto.user_name,
                email: createUserDto.email,
                password: await this.hashPassword(createUserDto.password),
            }
        })

        const otp = await this.otpServie.createOtp(user.id)

        const newUser = await this.ormService.user.update({
            where: {
                id: user.id
            },
            data: {
                otp_id: otp.id
            },
            select: {
                password: false
            }
        })

        console.log(otp.token)

        const token = this.signJwt(user.id)

        return {user: newUser, token}
    }

    public signJwt ( id: string | object | Buffer  ) {
        return jwt.sign(
            {id},
            JWT_SECRET_KEY as string,
            { expiresIn: JWT_EXPIRES_IN }
        )
    }

    public verifyJwt ( token: string ) {
        return jwt.verify(token, JWT_SECRET_KEY as string) as {id: string}
    }

    private async hashPassword (password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    private async passwordsMatch (currentPassword: string, newPassword: string): Promise<boolean> {
        return await bcrypt.compare(currentPassword, newPassword)
    }

}