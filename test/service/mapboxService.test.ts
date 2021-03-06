import 'reflect-metadata';
import got, { Got } from 'got';
import { mocked } from 'ts-jest/utils';
import ConverterStrategy from '../../src/service/converter/strategy/converterStrategy';
import MapBoxService from '../../src/service/converter/strategy/mapboxService';
import { MockedFunction } from 'ts-jest/dist/utils/testing';

describe('MapboxService', () => {

    let mapboxService: ConverterStrategy;
    let mockedGot: MockedFunction<Got>;

    beforeAll(() => {
        jest.mock('got');
        mockedGot = mocked(got);
        process.env.MAPBOX_API_KEY = '123';
        mapboxService = new MapBoxService();
    });

    it('should return coords', async () => {
        const expected = { latitude: 1, longitude: 1 };
        mockedGot.get = jest.fn().mockReturnValue({
            json: () => { return Promise.resolve({
                features: [
                    { geometry: { coordinates: [ 1, 1 ] }},
                    { geometry: { coordinates: [ 2, 2 ] }},
                    { geometry: { coordinates: [ 3, 3 ] }}
                ]
            }) },
        } as any);
        const result = await mapboxService.getGepositionFromAddress('fatima');
        expect(result).toEqual(expected)
    });

    it('should return undefined without result', async () => {
        mockedGot.get = jest.fn().mockReturnValue({
            json: () => { return Promise.resolve({
                features: []
            }) },
        } as any);
        const result = await mapboxService.getGepositionFromAddress('fatima');
        expect(result).toEqual(undefined)
    });

    it('should return undefined with any error', async () => {
        mockedGot.get = jest.fn().mockReturnValue({
            json: () => { return Promise.resolve({
                noFeatures: []
            }) },
        } as any);
        const result = await mapboxService.getGepositionFromAddress('fatima');
        expect(result).toEqual(undefined)
    });

});