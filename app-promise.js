const yargs = require('yargs');
const axios = require('axios');


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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
axios.get(geocodeURl).then((response) => {
    {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address !');
        }
        const lat = response.data.results[0].geometry.location.lat;
        const long = response.data.results[0].geometry.location.lng;
        const weatherURL = `https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${lat},${long}`;
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherURL);
    }
}).then((res) => {
    const temperature = res.data.currently.temperature;
    const apparentTempareture = res.data.currently.apparentTemperature;
    console.log(`Temperature: ${temperature}, feeling  : ${apparentTempareture}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unnable to connect API server.');
    }

});