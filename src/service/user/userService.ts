import UserEntity from '../../entity/user';

export default interface UserService {
    existsByUsername(username: string): Promise<Boolean>;
    getUserByUsername(username: string): Promise<UserEntity>;
    createUser(username: string, password: string): Promise<UserEntity>;
    validateUserDoesntExists(username: string): Promise<void>;
    validateUserCanLogin(user: UserEntity, password: string): Promise<void>;
}