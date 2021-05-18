import RegistrableController from './registrableController';
import { inject, injectable } from 'inversify';
import { Application, NextFunction, Request, Response } from 'express';
import { dataResponse } from '../util/response';
import Types from '../config/types';
import AuthService from '../service/auth/authService';
import ConverterService from '../service/converter/converterService';

@injectable()
export default class ConverterController implements RegistrableController {
    
    @inject(Types.AuthService)
    private authService: AuthService;

    @inject(Types.ConverterService)
    private converterService: ConverterService;

    public register(app: Application): void {

        app.route('/convert')
            .get(this.authService.authenticate.bind(this.authService),
                async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const address: any = req.query.address;
                    const result = await this.converterService.convertAddress(address);
                    return dataResponse(res, result);
                } catch (error) {
                    return next(error);
                }
            });

    }

}