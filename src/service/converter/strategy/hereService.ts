import { injectable } from 'inversify';
import IConverter from './converterStrategy';
import got from 'got';

@injectable()
export default class HereService implements IConverter {

    /**
     * Peticion HTTP al servicio de Here
     * @param address Direccion
     * @returns Resultado de Mapbox
     */
     private async makeRequest(address: string): Promise<{ items: Array<any> }> {
        const apiKey = process.env.HERE_API_KEY;
        const center = '6.25184,-75.56359'
        const url = `https://geocode.search.hereapi.com/v1/geocode?at=${center}&q=${address}&apiKey=${apiKey}`
        return await got.get(url).json();
    }

    /**
     * Hace una petición HTTP a al API de Here para retornar una lista de sitios que hacen match
     * con la direccion, en caso de encontrar uno válido, este retornará esa posición, en caso contrario
     * retornará undefined
     * Se settea por defecto el centro como punto de referencia
     * @param address Direccion
     * @returns Coordenadas
     */
    public async getGepositionFromAddress(address: string): Promise<{ latitude: number; longitude: number; }> {
        try {
            const result = await this.makeRequest(address);
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