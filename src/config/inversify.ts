import { Container } from 'inversify';
import RegistrableController from '../controllers/registrableController';
import ConverterController from '../controllers/converterController';
import UserController from '../controllers/userController';
import Types from './types';

/**
 * Se define un contenedor para la inversion de dependencias.
 */
const container: Container = new Container();

container.bind<RegistrableController>(Types.Controller).to(UserController);
container.bind<RegistrableController>(Types.Controller).to(ConverterController);

export { container };