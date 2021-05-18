import { inject, injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import Types from '../../config/types';
import UserEntity from '../../entity/user';
import UserService from './userService';
import UserRepository from '../../repository/user/userRepository';
import { BadRequest, NotFound } from '../../util/exception';

@injectable()
export default class UserServiceImpl implements UserService {

    private saltRounds = 10;

    constructor(@inject(Types.UserRepository) private readonly userRepository: UserRepository) {}

    /**
     * Genera un hash apartir de una contraseña
     * @param password Contraseña sin encriptar
     * @returns contraseña
     */
    private async getHash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    /**
     * Permite verificar si una contraseña es igual al hash guardado anteriormente
     * @param password Contraseña
     * @param hash Contraseña hasheada
     * @returns Boolean
     */
    private async compareHash(password: string, hash: string): Promise<Boolean> {
        return await bcrypt.compare(password, hash);
    }

    /**
     * Busca en la base de datos si existe un usuario con este username
     * @param username Usuario
     * @returns Boolean
     */
    public async existsByUsername(username: string): Promise<Boolean> {
        const result = await this.userRepository.findByUsername(username);
        return !!result;
    }

    /**
     * Busca en la base de datos un usuario con un username
     * @param username Usuario
     * @returns UserEntity
     */
    public async getUserByUsername(username: string): Promise<UserEntity> {
        const result = await this.userRepository.findByUsername(username);
        if (!result) {
            throw new NotFound('Unable to find user');
        }
        return result;
    }

    /**
     * Guarda en la base de datos un nuevo usuario
     * @param username Usuario
     * @param password Contraseña
     * @returns UserEntity
     */
    public async createUser(username: string, password: string): Promise<UserEntity> {
        const user: UserEntity = new UserEntity();
        user.username = username;
        user.passwordHash = await this.getHash(password);
        return await this.userRepository.save(user);
    }

    /**
     * Permite verificar si un usuario no existe en la base de datos
     * @param username Usuario
     */
    public async validateUserDoesntExists(username: string): Promise<void> {
        const exists = await this.existsByUsername(username);
        if (exists) throw new BadRequest('Unable to create user with that username');
    }

    /**
     * Permite validar si el usuario que intenta ingresar, tiene la misma contraseña guardada en la bd
     * @param user UserEntity
     * @param password Contraseña
     */
    public async validateUserCanLogin(user: UserEntity, password: string): Promise<void> {
        const result = await this.compareHash(password, user.passwordHash);
        if (!result) {
            throw new BadRequest('Invalid username or password');
        }
    }

}