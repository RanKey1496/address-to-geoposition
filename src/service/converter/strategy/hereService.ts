import { injectable } from 'inversify';
import IConverter from './converterStrategy';
import got from 'got';

@injectable()
export default class HereService implements IConverter {

    public async getGepositionFromAddress(address: string): Promise<{ latitude: number; longitude: number; }> {
        try {
            const apiKey = process.env.HERE_API_KEY;
            const center = '6.25184,-75.56359'
            const url = `https://geocode.search.hereapi.com/v1/geocode?at=${center}&q=${address}&apiKey=${apiKey}`
            const result: { items: Array<any> } = await got.get(url).json();
            for (const item of result.items) {
                if (item?.position) {
                    return { latitude: item.position.lat, longitude: item.position.lng };
                }
            }
        } catch (error) {
            console.log('Error in here service: ', error)
        }
    }
    
}