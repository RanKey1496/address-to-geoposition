import 'reflect-metadata';
import got, { Got } from 'got';
import { mocked } from 'ts-jest/utils';
import ConverterStrategy from '../../src/service/converter/strategy/converterStrategy';
import HereService from '../../src/service/converter/strategy/hereService';
import { MockedFunction } from 'ts-jest/dist/utils/testing';

describe('HereService', () => {

    let hereService: ConverterStrategy;
    let mockedGot: MockedFunction<Got>;

    beforeAll(() => {
        jest.mock('got');
        mockedGot = mocked(got);
        process.env.HERE_API_KEY = '123';
        hereService = new HereService();
    });

    it('should return coords', async () => {
        const expected = { latitude: 1, longitude: 1 };
        mockedGot.get = jest.fn().mockReturnValue({
            json: () => { return Promise.resolve({
                items: [
                    { position: { lat: 1, lng: 1 }},
                    { position: { lat: 2, lng: 2 }},
                    { position: { lat: 3, lng: 3 }}
                ]
            }) },
        } as any);
        const result = await hereService.getGepositionFromAddress('fatima');
        expect(result).toEqual(expected)
    });

    it('should return undefined without result', async () => {
        mockedGot.get = jest.fn().mockReturnValue({
            json: () => { return Promise.resolve({
                items: []
            }) },
        } as any);
        const result = await hereService.getGepositionFromAddress('fatima');
        expect(result).toEqual(undefined)
    });

    it('should return undefined with any error', async () => {
        mockedGot.get = jest.fn().mockReturnValue({
            json: () => { return Promise.resolve({
                noItems: []
            }) },
        } as any);
        const result = await hereService.getGepositionFromAddress('fatima');
        expect(result).toEqual(undefined)
    });

});