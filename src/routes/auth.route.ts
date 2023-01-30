import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/create-user.dto';
import ErrorMessage from '../enums/validation.error.enums';
import { IRoute } from '../interfaces/route.interface';
import dtoValidationMiddleware from '../middlewares/validation.middleware';

export default class AuthRoute implements IRoute{
    public path: string = '/auth';
    public router: Router = Router();
    private controller: AuthController = new AuthController()

    constructor () {
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.post(
            `${this.path}/login`, 
            dtoValidationMiddleware(CreateUserDto, "body", ErrorMessage.FIELDS),
            this.controller.login
        )

    }

}