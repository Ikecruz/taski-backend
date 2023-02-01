import { PrismaClient } from "@prisma/client";
import moment from "moment"
import database from "../database"

export default class OtpService {

    private ormService: PrismaClient;

    constructor () {
        this.ormService = database.getClient()
    }

    public async createOtp (user_id: string) {
        return await this.ormService.otp.create({
            data: {
                token: this.generateOtp(),
                expiry: moment().add(10, 'm').toDate(),
                type: 'email',
                user_id: user_id
            }
        })
    }   

    public generateOtp () :string {
        let otp = ""

        for (let i = 0; i < 4; i++) otp += Math.floor(Math.random() * 9)

        return otp
    }

}