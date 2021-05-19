import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpException } from './exception';

function data(success: boolean, message: string) {
    return {
        success,
        message
    };
}

export function dataResponse(res: Response, data: any) {
    return res.status(200).json({ success: true, data });
}

export function validatorResponse(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}

export function exceptionResponse(res: Response, exception: HttpException) {
    return res.status(exception.status).json(data(false, exception.message));
}

export function internalResponse(res: Response) {
    return res.status(500).json(data(false, 'Internal server error, try again later'));
}