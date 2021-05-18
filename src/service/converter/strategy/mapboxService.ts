import { injectable } from 'inversify';
import IConverter from './converterStrategy';
import got from 'got';

@injectable()
export default class MapBoxService implements IConverter {

    public async getGepositionFromAddress(address: string): Promise<{ latitude: number; longitude: number; }> {
        try {
            const apiKey = process.env.MAPBOX_API_KEY;
            const center = '-75.56359,6.25184'
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=co&types=address&proximity=${center}&access_token=${apiKey}` 
            const result: { features: Array<any> } = await got.get(url).json();
            for (const feature of result.features) {
                if (feature?.geometry?.coordinates) {
                    const coords = feature.geometry.coordinates;
                    return { latitude: coords[1], longitude: coords[0] };
                }
            }
        } catch (error) {
            console.log('Error in mapbox service: ', error)
        }
    }

}