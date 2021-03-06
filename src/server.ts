import 'reflect-metadata';
import App from './app';

console.log('Address to Geoposition Service');

process.on('uncaughtException', (err) => {
    console.error(`
    --------------------
    Unhandled Exception:
    ${err.message}
    --------------------
    `);
});

process.on('unhandledRejection', (err) => {
    console.error(`
    --------------------
    Unhandled Rejection:
    ${err}
    --------------------
    `);
});

module.exports = new App();