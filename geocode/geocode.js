const request = require('request');
const geocodeAddress = (address, callback) => {
    const encodeAddress = encodeURIComponent(address);
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
        json: true
    }, (err, response, body) => {
        // console.log(JSON.stringify(body,undefined,2));
        if (err) {
            callback('Unable to connect to GG server !');
        } else if (body.status === 'ZERO_RESULTS' || body.status === 'OVER_QUERY_LIMIT') {
            callback('Unable to find address !');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longtitude : body.results[0].geometry.location.lng
            });
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;