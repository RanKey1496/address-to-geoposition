import { injectable } from 'inversify';
import { container } from '../../config/inversify';
import Types from '../../config/types';
import { NotFound } from '../../util/exception';
import ConverterService from './converterService';
import IConverter from './strategy/converterStrategy';

@injectable()
export default class ConverterServiceImpl implements ConverterService {

    /**
     * Función que utilia la estrategia enviada para convertir una direccion a coordenadas
     * @param converter Estrategia
     * @param address Direccion a convertir
     * @returns Coordenadas
     */
    private async getGepositionFromAddress(converter: IConverter, address: string): Promise<{ latitude: number, longitude: number }> {
        return await converter.getGepositionFromAddress(address);
    }

    /**
     * Función que utiliza las estrategias registradas en el contenedor de inversify hasta encontrar
     * una que retorne un valor válido, en caso de no encontrar valores, retornará 404
     * @param address Direccion
     * @returns Coordenadas
     */
    public async convertAddress(address: string): Promise<{ latitude: number, longitude: number }> {
        const services: IConverter[] = container.getAll<IConverter>(Types.ConverterStrategy);
        for (let i = 0; i < services.length; i++) {
            const result = await this.getGepositionFromAddress(services[i], address);
            if (result) {
                console.log('Got result: ', result, services[i])
                return result;
            }
        }
        throw new NotFound('Unable to transform address to geoposition');
    }

}