import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import AuthService from '../../src/service/auth/authService';
import AuthServiceImpl from '../../src/service/auth/authServiceImpl';
import { Unauthorized } from '../../src/util/exception';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {

    let authService: AuthService;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();
    let validToken: string;

    beforeAll(async done => {
        authService = new AuthServiceImpl();
        process.env.SECRET_KEY = 'test'
        validToken = jwt.sign({ username: 'jimbo' }, process.env.SECRET_KEY, { expiresIn: 60 });
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        };
        done();
    });

    describe('createToken', () => {
        it('should return a random token', () => {
            const result = authService.createToken('jimbo');
            expect(result).toHaveProperty('token');
        });
    });

    describe('createTokenAndRefreshToken', () => {
        it('should return a random token and a random refresh token', () => {
            const result = authService.createTokenAndRefreshToken('jimbo');
            expect(result).toHaveProperty('token');
            expect(result).toHaveProperty('refreshToken');
        });
    });

    describe('authenticate', () => {
        it('should throw if token is not present', async () => {
            mockRequest = {
                headers: {
                }
            }
            expect(authService.authenticate(mockRequest as Request, mockResponse as Response, nextFunction));
            expect(nextFunction).toBeCalledWith(new Unauthorized('Unable to find token'));
        });

        it('should throw with invalid token', async () => {
            mockRequest = {
                headers: {
                    'authorization': 'Bearer abc'
                }
            }
            expect(authService.authenticate(mockRequest as Request, mockResponse as Response, nextFunction));
            expect(nextFunction).toBeCalledWith(new Unauthorized('Invalid token'));
        });

        it('should throw with expired token', async () => {
            mockRequest = {
                headers: {
                    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppbWJvMiIsImlhdCI6MTYyMTE5MjExMCwiZXhwIjoxNjM0MTUyMTEwfQ.3bnqJt7VPq5ri8EFG33_SsqPpKVAXAUrcKXf1V3LGng'
                }
            }
            expect(authService.authenticate(mockRequest as Request, mockResponse as Response, nextFunction));
            expect(nextFunction).toBeCalledWith(new Unauthorized('Invalid token'));
        });

        it('should throw without space between bearer and text', async () => {
            mockRequest = {
                headers: {
                    'authorization': 'Bearerey'
                }
            }
            expect(authService.authenticate(mockRequest as Request, mockResponse as Response, nextFunction));
            expect(nextFunction).toBeCalledWith(new Unauthorized('Invalid token'));
        });

        it('should passw with valid token', async () => {
            mockRequest = {
                headers: {
                    'authorization': 'Bearer ' + validToken
                }
            }
            expect(authService.authenticate(mockRequest as Request, mockResponse as Response, nextFunction));
            expect(nextFunction).toBeCalled();
        });
    });

});