import { Container } from 'inversify';
import RegistrableController from '../controllers/registrableController';
import ConverterController from '../controllers/converterController';
import UserController from '../controllers/userController';
import Types from './types';
import UserService from '../service/user/userService';
import UserServiceImpl from '../service/user/userServiceImpl';
import UserRepository from '../repository/user/userRepository';
import AuthService from '../service/auth/authService';
import AuthServiceImpl from '../service/auth/authServiceImpl';
import ConverterService from '../service/converter/converterService';
import ConverterServiceImpl from '../service/converter/converterServiceImpl';
import MapBoxService from '../service/converter/strategy/mapboxService';
import HereService from '../service/converter/strategy/hereService';
import IConverter from '../service/converter/strategy/converterStrategy';

/**
 * Se define un contenedor para la inversion de dependencias.
 */
const container: Container = new Container();

container.bind<RegistrableController>(Types.Controller).to(UserController);
container.bind<RegistrableController>(Types.Controller).to(ConverterController);

container.bind<AuthService>(Types.AuthService).to(AuthServiceImpl);
container.bind<UserService>(Types.UserService).to(UserServiceImpl);
container.bind<ConverterService>(Types.ConverterService).to(ConverterServiceImpl);
container.bind<IConverter>(Types.ConverterStrategy).to(MapBoxService);
container.bind<IConverter>(Types.ConverterStrategy).to(HereService);

container.bind<UserRepository>(Types.UserRepository).to(UserRepository);

export { container };