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

/**
 * Se define un contenedor para la inversion de dependencias.
 */
const container: Container = new Container();

container.bind<RegistrableController>(Types.Controller).to(UserController);
container.bind<RegistrableController>(Types.Controller).to(ConverterController);

container.bind<UserService>(Types.UserService).to(UserServiceImpl);
container.bind<AuthService>(Types.AuthService).to(AuthServiceImpl);

container.bind<UserRepository>(Types.UserRepository).to(UserRepository);

export { container };