const yargs = require('yargs');
const geocode = require('./geocode/geocode');

const argv = yargs.option({
    a: {
        demand: true,
        alias: 'adr',
        describe: 'Address to fetch weather for ',
        string: true
    }
}).help().alias('help', 'h').argv;

geocode.geocodeAddress(argv.address, (err, results) => {
    if(err){
        console.log(err);
    }else{
        console.log(JSON.stringify(results, undefined, 2));
    }
});

//0ab410d646fa20a46ec2129bab8cc8d4
