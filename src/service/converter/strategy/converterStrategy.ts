export default interface IConverter {
    getGepositionFromAddress(address: string): Promise<{ latitude: number, longitude: number }>;
}