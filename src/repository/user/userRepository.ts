import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import UserEntity from '../../entity/user';

@injectable()
export default class UserRepository {

    private userRepository: Repository<UserEntity>;

    /**
     * Guarda en la BD un registro
     * @param data Entity
     */
    public async save(data: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(data);
    }

    /**
     * Busca en la base de datos un usuario ya registrado
     * @param username Username string
     */
    public async findByUsername(username: string): Promise<UserEntity> {
        return await this.userRepository.findOne({ username });
    }

}