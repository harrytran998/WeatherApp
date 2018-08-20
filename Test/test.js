const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Must be number');
            }
        }, 1000);
    });
};

asyncAdd(1, 2).then((res) => {
    console.log(`Result : ${res}`);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log(`Should be 36 ? ${res}`);
}).catch((errMessage) => {
    console.log(errMessage);
});