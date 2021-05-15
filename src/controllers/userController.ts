import RegistrableController from './registrableController';
import { inject, injectable } from 'inversify';
import { Application, NextFunction, Request, Response } from 'express';
import { dataResponse } from '../util/response';
import Types from '../config/types';
import UserService from '../service/user/userService';

@injectable()
export default class UserController implements RegistrableController {

    @inject(Types.UserService)
    private userService: UserService;
    
    public register(app: Application): void {

        app.route('/signup')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    return dataResponse(res, 'Melo');
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/login')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    return dataResponse(res, 'Melo');
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/refresh')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    return dataResponse(res, 'Melo');
                } catch (error) {
                    return next(error);
                }
            });

    }

}