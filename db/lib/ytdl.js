var fetch = require("node-fetch");

function bytesToSize(pBytes, pUnits = 'sim') {
 if (!Number(pBytes)) return '0 Bytes';
 if (pBytes == 0) return '0 Bytes';
 if (pBytes == 1) return '1 Byte';
 if (pBytes == -1) return '-1 Byte';

 var bytes = Math.abs(pBytes)
 if (pUnits && pUnits.toLowerCase() == 'sim') {
  var orderOfMagnitude = Math.pow(10, 3);
  var abbreviations = ['Bytes',
   'kB',
   'MB',
   'GB',
   'TB',
   'PB',
   'EB',
   'ZB',
   'YB'];
 } else {
  var orderOfMagnitude = Math.pow(2, 10);
  var abbreviations = ['Bytes',
   'KiB',
   'MiB',
   'GiB',
   'TiB',
   'PiB',
   'EiB',
   'ZiB',
   'YiB'];
 }
 var i = Math.floor(Math.log(bytes) / Math.log(orderOfMagnitude));
 var result = (bytes / Math.pow(orderOfMagnitude, i));
 if (pBytes < 0) {
  result *= -1;
 }
 if (result >= 99.995 || i == 0) {
  return result.toFixed(0) + ' ' + abbreviations[i];
 } else {
  return result.toFixed(2) + ' ' + abbreviations[i];
 }
}

const ytdl = (id, type = 'audio') => {
 return new Promise(async (resolve, reject) => {
  fetch('https://m.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    'Content-Length': '95'
   },
   body: JSON.stringify({
    context: {
     client: {
      clientName: 'ANDROID', clientVersion: '16.20'
     }
    },
    videoId: id
   })
  }).then(res => res.json()).then(data => {
   let ytDl = {
    audio: {}, video: {}
   }
   for (let v of data.streamingData.formats) {
    ytDl.video[v.itag] = {
     mime: v.mimeType,
     size: (v.contentLength && bytesToSize(v.contentLength) || ''),
     quality: v.qualityLabel,
     dl_link: v.url
    }
   }
   for (let v of data.streamingData.adaptiveFormats.filter(a => a.audioQuality)) {
    ytDl.audio[v.itag] = {
     mime: v.mimeType,
     size: (v.contentLength && bytesToSize(v.contentLength) || ''),
     quality: '128Kbps',
     dl_link: v.url
    }
   }
   let result = {}
   if (/audio/.test(type)) result = ytDl.audio['140'] || ytDl.audio['251'] || ytDl.audio['250'] || ytDl.audio['249'] || ytDl.audio['139']
   if (/video/.test(type)) result = ytDl.video['22'] || ytDl.video['18'] || ytDl.video['17']
   console.log(result)
   resolve(result);
  }).catch(reject);
 })
}

module.exports = {
 ytdl
};