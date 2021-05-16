import { Response } from 'express';
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

export function exceptionResponse(res: Response, exception: HttpException) {
    return res.status(exception.status).json(data(false, exception.message));
}

export function internalResponse(res: Response) {
    return res.status(500).json(data(false, 'Internal server error, try again later'));
}