import { inject, injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import Types from '../../config/types';
import UserEntity from '../../entity/user';
import UserService from './userService';
import UserRepository from '../../repository/user/userRepository';
import { BadRequest, NotFound } from '../../util/exception';

@injectable()
export default class UserServiceImpl implements UserService {

    private saltRounds = 20;

    constructor(@inject(Types.UserRepository) private readonly userRepository: UserRepository) {}

    private async getHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    private async compareHash(password: string, hash: string): Promise<Boolean> {
        return bcrypt.compare(password, hash);
    }

    public async existsByUsername(username: string): Promise<Boolean> {
        const result = await this.userRepository.findByUsername(username);
        return !!result;
    }

    public async getUserByUsername(username: string): Promise<UserEntity> {
        const result = await this.userRepository.findByUsername(username);
        if (!result) {
            throw new NotFound('Unable to find user');
        }
        return result;
    }

    public async createUser(username: string, password: string): Promise<UserEntity> {
        const user: UserEntity = new UserEntity();
        user.username = username;
        user.passwordHash = await this.getHash(password);
        return await this.userRepository.save(user);
    }

    public async validateUserDoesntExists(username: string): Promise<void> {
        const exists = await this.existsByUsername(username);
        if (exists) throw new BadRequest('Unable to create user with that username');
    }

    public async validateUserCanLogin(user: UserEntity, password: string): Promise<void> {
        const result = await this.compareHash(password, user.passwordHash);
        if (!result) {
            throw new BadRequest('Invalid username or password');
        }
    }

}