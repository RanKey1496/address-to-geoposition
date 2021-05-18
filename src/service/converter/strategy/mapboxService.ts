import { injectable } from 'inversify';
import IConverter from './converterStrategy';
import got from 'got';

@injectable()
export default class MapBoxService implements IConverter {

    /**
     * Peticion HTTP al servicio de Mapbox
     * @param address Direccion
     * @returns Resultado de Mapbox
     */
    private async makeRequest(address: string): Promise<{features: Array<any>}> {
        const apiKey = process.env.MAPBOX_API_KEY;
        const center = '-75.56359,6.25184'
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=co&types=address&proximity=${center}&access_token=${apiKey}` 
        return await got.get(url).json();
    }

    /**
     * Hace una petición HTTP a al API de Mapbox para retornar una lista de sitios que hacen match
     * con la direccion, en caso de encontrar uno válido, este retornará esa posición, en caso contrario
     * retornará undefined
     * Se settea por defecto el centro como punto de referencia y Colombia como pais
     * @param address Direccion
     * @returns Coordenadas
     */
    public async getGepositionFromAddress(address: string): Promise<{ latitude: number; longitude: number; }> {
        try {
            const result = await this.makeRequest(address);
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