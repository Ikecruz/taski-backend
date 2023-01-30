import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import db from "../database"
import HttpException from '../utils/exception';

export default class UserService {

    private ormService = db.getClient()

    public async findByEmail (email: string) {
        const user = await this.ormService.user.findFirst({
            where: {
                email: email
            }
        })

        return user
    }

    public async findByUsername (username: string) {
        const user = await this.ormService.user.findFirst({
            where: {
                user_name: username
            }
        })

        return user
    }

    public async findById (id:string) {
        const user = await this.ormService.user.findFirst({
            where: {
                id: id
            }
        })

        if (!user) {
            throw new HttpException(
                StatusCodes.NOT_FOUND,
                "Record Not Found"
            )
        }

        return user
    }

}