import { inject, injectable } from 'inversify';
import * as bcrypt from 'bcrypt';
import Types from '../../config/types';
import UserEntity from '../../entity/user';
import UserService from './userService';
import UserRepository from '../../repository/user/userRepository';
import { NotFound } from '../../util/exception';

@injectable()
export default class UserServiceImpl implements UserService {

    private saltRounds = 20;

    constructor(@inject(Types.UserRepository) private readonly userRepository: UserRepository) {}

    public async existsByUsername(username: string): Promise<Boolean> {
        const result = await this.userRepository.findByUsername(username);
        if (!result) return false;
        return true;
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

    private async getHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    private async compareHash(password: string, hash: string): Promise<Boolean> {
        return bcrypt.compare(password, hash);
    }

}