import AuthService from './authService';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from '../../util/exception';

@injectable()
export default class AuthServiceImpl implements AuthService {

    /**
     * Genera un token con los datos enviados y utilizando una llave
     * @param data Datos a metern el payload del token
     * @param expiresIn Tiempo de expiración
     * @returns Token
     */
    private generateToken(data: any, expiresIn: number): string {
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(data, secretKey, { expiresIn });
        return token;
    }

    /**
     * Retorna un token con expiración de 1 hr
     * @param username Usuario
     * @returns Token
     */
    public createToken(username: string): { token: string } {
        const token = this.generateToken({ username }, 60 * 60);
        return { token };
    }

    /**
     * Genera un token con expiración de una hora y un refresh token que vece en 20 días
     * @param username Usuario
     * @returns Token
     */
    public createTokenAndRefreshToken(username: string): { token: string, refreshToken: string } {
        const token = this.generateToken({ username }, 60 * 60);
        const refreshToken = this.generateToken({ username }, 60 * 60 * 24 * 20);
        return { token, refreshToken };
    }

    /**
     * Middleware para verificar si un token enviado es válido
     * @param req Express request
     * @param res Express response
     * @param next Next Function
     */
    public async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
        let token;
        if (req.headers && req.headers['authorization']) token = req.headers['authorization'];
        if (!token) return next(new Unauthorized('Unable to find token'));
        try {
            token = token.split(' ')[1];
            const decode: any = await jwt.verify(token, process.env.SECRET_KEY);
            res.req.body.username = decode.username;
            return next();
        } catch (error) {
            return next(new Unauthorized('Invalid token'));
        }
    }

}