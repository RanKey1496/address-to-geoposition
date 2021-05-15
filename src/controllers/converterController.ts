import RegistrableController from './registrableController';
import { injectable } from 'inversify';
import { Application, NextFunction, Request, Response } from 'express';
import { dataResponse } from '../util/response';

@injectable()
export default class ConverterController implements RegistrableController {
    
    public register(app: Application): void {

        app.route('/test')
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    return dataResponse(res, 'Melo');
                } catch (error) {
                    return next(error);
                }
            });

    }

}