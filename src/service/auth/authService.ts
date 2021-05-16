import { NextFunction, Request, Response } from 'express';

export default interface AuthService {
    createToken(username: string): { token: string };
    createTokenAndRefreshToken(username: string): { token: string, refreshToken: string };
    authenticate(req: Request, res: Response, next: NextFunction): Promise<void>;
}