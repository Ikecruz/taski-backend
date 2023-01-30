import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import db from "../database"
import { CreateUserDto } from '../dtos/create-user.dto';
import HttpException from '../utils/exception';
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET_KEY, SECRET_KEY } from '../config';

export default class AuthService {

    private ormService = db.getClient();

    public async login(createUserDto: CreateUserDto) {

    }

    public signJwt ( userId: string | object | Buffer  ) {
        return jwt.sign(
            userId,
            JWT_SECRET_KEY as string,
            { expiresIn: JWT_EXPIRES_IN }
        )
    }

    public verifyJwt ( token: string ) {
        return jwt.verify(token, JWT_SECRET_KEY as string) as {id: string}
    }

    private async hashPassword (password: string): Promise<string> {
        return await bcrypt.hash(password, SECRET_KEY as string)
    }

    private async passwordsMatch (currentPassword: string, newPassword: string): Promise<boolean> {
        return await bcrypt.compare(currentPassword, newPassword)
    }

}