import { Application } from 'express';

export default interface RegistrableController {
    register(app: Application): void;
}