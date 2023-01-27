import { Router } from 'express';
import { IRoute } from '../interfaces/route.interface';

export default class AuthRoute implements IRoute{
    public path: string = '/auth';
    public router: Router = Router();

    constructor () {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(this.path, (req, res) => {
            res.send('400')
        })
    }

}