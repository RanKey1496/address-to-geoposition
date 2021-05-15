import { Response } from 'express';

function data(success: boolean, message: string) {
    return {
        success,
        message
    };
}

export function dataResponse(res: Response, data: any) {
    return res.status(200).json(data);
}

export function badRequestResponse(res: Response, message: string) {
    return res.status(400).json(data(false, message));
}

export function unauthorizedResponse(res: Response) {
    return res.status(401).json(data(false, 'You dont have power here'));
}

export function forbiddenResponse(res: Response, message: string) {
    return res.status(403).json(data(false, message));
}

export function notFoundResponse(res: Response, message: string) {
    return res.status(404).json(data(false, message));
}

export function internalResponse(res: Response) {
    return res.status(500).json(data(false, 'Internal server error, try again later'));
}