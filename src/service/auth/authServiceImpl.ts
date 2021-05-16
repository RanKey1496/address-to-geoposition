import JwtService from './authService';
import * as jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from '../../util/exception';

@injectable()
export default class AuthServiceImpl implements JwtService {

    private generateToken(data: any, expiresIn: number): string {
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(data, secretKey, { expiresIn });
        return token;
    }

    public createToken(username: string): { token: string } {
        const token = this.generateToken({ username }, 60 * 60);
        return { token };
    }

    public createTokenAndRefreshToken(username: string): { token: string, refreshToken: string } {
        const token = this.generateToken({ username }, 60 * 60);
        const refreshToken = this.generateToken({ username }, 60 * 60 * 60 * 60);
        return { token, refreshToken };
    }

    public async authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
        let token = req.get('Authorization');
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