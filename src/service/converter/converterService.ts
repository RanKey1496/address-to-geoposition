export default interface ConverterService {
    convertAddress(address: string): Promise<{ latitude: number, longitude: number }>;
}