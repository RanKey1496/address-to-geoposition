import 'reflect-metadata';
import UserRepository from '../../src/repository/user/userRepository';
import UserService from '../../src/service/user/userService';
import UserServiceImpl from '../../src/service/user/userServiceImpl';
import { anything, instance, mock, when } from 'ts-mockito';
import UserTestBuilder from '../util/userTestBuilder';
import { BadRequest, NotFound } from '../../src/util/exception';

describe('UserService', () => {

    let userService: UserService;
    let userRepository: UserRepository;

    beforeAll(async done => {
        userRepository = mock(UserRepository);
        userService = new UserServiceImpl(instance(userRepository));
        done();
    });

    describe('existsByUsername', () => {
        it('should return true if user exists', async () => {
            const user = UserTestBuilder.newUser().withDefaultValues().build();
            when(userRepository.findByUsername('jimbo')).thenResolve(user);
            const result = await userService.existsByUsername('jimbo');
            expect(result).toBeTruthy();
        });

        it('should return false if user doesnt exists', async () => {
            when(userRepository.findByUsername('jimbo')).thenResolve(undefined);
            const result = await userService.existsByUsername('jimbo');
            expect(result).toBeFalsy();
        });
    });

    describe('getUserByUsername', () => {
        it('should return user by username', async () => {
            const user = UserTestBuilder.newUser().withDefaultValues().build();
            when(userRepository.findByUsername('jimbo')).thenResolve(user);
            const result = await userService.getUserByUsername('jimbo');
            expect(result).toEqual(user);
        });

        it('should throw notfound if user doesnt exists', async () => {
            when(userRepository.findByUsername('jimbo')).thenResolve(undefined);
            await expect(userService.getUserByUsername('jimbo')).rejects.toThrow(NotFound);
            await expect(userService.getUserByUsername('jimbo')).rejects.toThrow('Unable to find user');
        });
    });

    describe('createUser', () => {
        it('should create new user', async () => {
            const user = UserTestBuilder.newUser().withDefaultValues().build();
            when(userRepository.save(anything())).thenResolve(user);
            const result = await userService.createUser(user.username, user.passwordHash);
            expect(result).toEqual(user);
        });
    });

    describe('validateUserDoesntExists', () => {
        it('should pass if user doesnt exists', async () => {
            await expect(userService.validateUserDoesntExists('jimbo')).resolves.not.toThrow();
        });

        it('should throw if user exists', async () => {
            const user = UserTestBuilder.newUser().withDefaultValues().build();
            when(userRepository.findByUsername('jimbo')).thenResolve(user);
            await expect(userService.validateUserDoesntExists('jimbo')).rejects.toThrow(BadRequest);
            await expect(userService.validateUserDoesntExists('jimbo')).rejects.toThrow('Unable to create user with that username');
        });
    })

    describe('validateUserCanLogin', () => {
        it('should throw if hash arent equal', async () => {
            const user = UserTestBuilder.newUser().withDefaultValues().build();
            await expect(userService.validateUserCanLogin(user, '123')).rejects.toThrow(BadRequest);
            await expect(userService.validateUserCanLogin(user, '123')).rejects.toThrow('Invalid username or password');
        });
    });

});