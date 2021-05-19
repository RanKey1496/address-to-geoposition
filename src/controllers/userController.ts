import RegistrableController from './registrableController';
import { inject, injectable } from 'inversify';
import { Application, NextFunction, Request, Response } from 'express';
import { dataResponse, validatorResponse } from '../util/response';
import Types from '../config/types';
import UserService from '../service/user/userService';
import AuthService from '../service/auth/authService';
import { body } from 'express-validator';

@injectable()
export default class UserController implements RegistrableController {

    @inject(Types.UserService)
    private userService: UserService;

    @inject(Types.AuthService)
    private authService: AuthService;
    
    public register(app: Application): void {

        app.route('/signup')
            .post([
                    body('username').exists(),
                    body('password').isLength({ min: 5 })
                ],
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    if (validatorResponse(req, res)) return;
                    const { username, password } = req.body;
                    await this.userService.validateUserDoesntExists(username);
                    await this.userService.createUser(username, password);
                    return dataResponse(res, 'User created successfully');
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/login')
            .post([
                    body('username').exists(),
                    body('password').exists()
                ],
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    if (validatorResponse(req, res)) return;
                    const { username, password } = req.body;
                    const user = await this.userService.getUserByUsername(username);
                    await this.userService.validateUserCanLogin(user, password);
                    const result = await this.authService.createTokenAndRefreshToken(user.username);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

        app.route('/refresh')
            .post(this.authService.authenticate.bind(this.authService),
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const token = await this.authService.createToken(res.req.body.username);
                    return dataResponse(res, token);
                } catch (error) {
                    return next(error);
                }
            });

    }

}