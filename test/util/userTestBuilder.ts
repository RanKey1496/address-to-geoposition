import UserEntity from '../../src/entity/user';

export default class UserTestBuilder {

    private user: UserEntity = new UserEntity();

    public static newUser() {
        return new UserTestBuilder;
    }

    public withUsername(username: string): UserTestBuilder {
        this.user.username = username;
        return this;
    }

    public withPasswordHash(passwordHash: string): UserTestBuilder {
        this.user.passwordHash = passwordHash;
        return this;
    }

    public withDefaultValues(): UserTestBuilder {
        return this.withUsername('jimbo').withPasswordHash('123');
    }

    public build(): UserEntity {
        return this.user;
    }

}