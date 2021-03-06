import express, { Application, Request, Response, NextFunction } from 'express';
import RegistrableController from './controllers/registrableController';
import { container } from './config/inversify';
import { exceptionResponse, internalResponse } from './util/response';
import { createConnection } from 'typeorm';
import { ENVIRONMENT } from './util/secret';
import { HttpException } from './util/exception';
import compression from 'compression';
import helmet from 'helmet';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import cors from 'cors';
import Types from './config/types';
import { dbOptions } from './config/db';

export default class App {

    constructor() {
        this.start();
    }

    /**
     * Creamos una instancia de express, agregamos plugins que nos ayudarán con logs, errores, compresión y seguridad.
     * Adicional creamos una conexión a la base de datos Postgresql.
     */
    private async init() {

        await createConnection(dbOptions);

        const app: Application = express();
        app.set('port', process.env.PORT || 3000);

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(compression());
        app.use(helmet());
        app.use(cors());
        app.use(morgan('common'));
        if (ENVIRONMENT !== 'production') app.use(errorHandler());

        const controllers: RegistrableController[] = container.getAll<RegistrableController>(Types.Controller);
        controllers.forEach(controller => controller.register(app));

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof HttpException) {
                return exceptionResponse(res, err);
            }
            return internalResponse(res);
        });
        return app;
    }

    /**
     * Ponemos todo en marcha
     */
    public async start() {
        const app = await this.init();
        const server = app.listen(app.get('port'), async () => {
            console.log(`Service running at port ${app.get('port')} in ${app.get('env')} mode`);
            console.log('Starting date:', new Date());
        });
        return server;
    }

}