/*NPM MODULES*/

const webp = require('node-webpmux');

const crypto = require('crypto');


/*EXIF HANDLER*/
const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);

function GetData ({ packname = 'PACK PADRAO', author = 'AUTOR PADRAO', emojis = [] }) {
    this["sticker-pack-id"] = crypto.randomBytes(32).toString('hex');
    this["sticker-pack-name"] = packname;
    this["sticker-pack-publisher"] = author;
    this["android-app-store-link"] = 'LINK';
    this["ios-app-store-link"] = 'LINK';
    this["emojis"] = emojis;
};

const addExif = (webpPath, options = {}) => new Promise(async (resolve, reject) => {
    const data = new GetData(options);
    const img = new webp.Image();
    const dataBuffer = Buffer.from(JSON.stringify(data), 'utf8');
    const exif = Buffer.concat([exifAttr, dataBuffer]);
    exif.writeUIntLE(dataBuffer.length, 14, 4);
    await img.load(webpPath).catch(reject);
    img.exif = exif;
    await img.save(webpPath).catch(reject);
    resolve(webpPath);
});

const getExif = (webpPath) => new Promise(async (resolve, reject) => {
    const img = new webp.Image();
    await img.load(webpPath).catch(reject);
    resolve(JSON.parse(String(img.exif).replace(/^.*?(?=\{)/, '')));
});

module.exports = {
    addExif,
    getExif
};
