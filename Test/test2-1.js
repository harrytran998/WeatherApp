const weather = require('./weather/weather');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`${results.address} + ${results.latitude} + ${results.longitude}`);
        weather.getWeather(results.latitude, results.longitude, (error, resultsWeather) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Fuck : ${resultsWeather.temperature} |||| ${resultsWeather.apparentTemperature}`);
            }
        });

    }
});