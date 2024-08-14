const fs = require('fs');
const crypto = require('crypto');

const NUM_RIDERS = 10;
const riders = [];

for (let i = 0; i < NUM_RIDERS; i++) {
    const riderId = crypto.randomBytes(4).toString('hex').toUpperCase(); // 8-character alphanumeric ID
    const rider = {
        id: riderId,
        name: `Rider ${i + 1}`,
        qrCodeData: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${riderId}`
    };
    riders.push(rider);
}

fs.writeFileSync('./data/riders.json', JSON.stringify(riders, null, 2));

console.log(`${NUM_RIDERS} riders generated and saved to riders.json.`);
