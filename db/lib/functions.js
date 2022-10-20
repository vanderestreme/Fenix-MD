const {
 default: makeWASocket,
  DisconnectReason,
  useSingleFileAuthState,
  downloadContentFromMessage,
  makeInMemoryStore,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  proto
 } = require('@adiwajshing/baileys');

 const {
  archive
 } = require('../../settings/function');

 const {
  prefixo,
  owner,
  compreSuaApikey,
  api,
  logo
 } = require('../../configure aqui.js');

 // Arquivos
 const {
  color
 } = require('../../db/lib/color');

 const {
  linguagem,
  mess
 } = require('../../db/database/menu');

 const fetch = require('node-fetch')
 const axios = require('axios')
 const fs = require('fs')
 const {
  tmpdir
 } = require("os")
 const Crypto = require("crypto")
 const ff = require('fluent-ffmpeg')
 const webp = require("node-webpmux")
 const path = require("path")

 // togif
 let BodyForm = require('form-data')
 let {
  fromBuffer
 } = require('file-type')
 let cheerio = require('cheerio')

 const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
   i.isAdmin ? admins.push(i.jid): '';
  }
  return admins;
 };

 // Remody tobi
 const getBuffer = (url, options) => new Promise(async (resolve, reject) => {
  options ? options: {}
  await axios({
   method: "get", url, headers: {
    'DNT': 1, 'Upgrade-Insecure-Request': 1
   }, ...options, responseType: 'arraybuffer'
  }).then((res) => {
   resolve(res.data)
  }).catch(reject);
 });

 const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
  fetch(url, options).then(response => response.json()).then(json => {
   resolve(json)
  }).catch(reject);
 })

 const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`
 }

 const mimetype = require('mime-types')
 const getExtension = async (type) => {
  return await mimetype.extension(type)
 }

 const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
 }

 const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
 }

 const getFileBuffer = async (mediakey, MediaType) => {
  const stream = await downloadContentFromMessage(mediakey, MediaType)
  let buffer = Buffer.from([])
  for await(const chunk of stream) {
   buffer = Buffer.concat([buffer, chunk])
  }
  return buffer
 }

 async function imageToWebp (media) {
  const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
  const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`)
  fs.writeFileSync(tmpFileIn, media)
  await new Promise((resolve, reject) => {
   ff(tmpFileIn)
   .on("error", reject)
   .on("end", () => resolve(true))
   .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
   .toFormat("webp")
   .save(tmpFileOut)
  })

  const buff = fs.readFileSync(tmpFileOut)
  fs.unlinkSync(tmpFileOut)
  fs.unlinkSync(tmpFileIn)
  return buff
 }

 const readMore = `\u{200b}`.repeat(3073)

 const runtime = function(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " dia, ": " dias, "): "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, ": " horas, "): "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, ": " minutos, "): "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo": " segundos"): "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
 }

 function togif(path) {
  return new Promise((resolve, reject) => {
   const form = new BodyForm()
   form.append('new-image-url', '')
   form.append('new-image', fs.createReadStream(path))
   axios({
    method: 'post', url: 'https://s6.ezgif.com/webp-to-mp4', data: form, headers: {
     'Content-Type': `multipart/form-data; boundary=${form._boundary}`
    }}).then(({
     data
    }) => {
    const bodyFormThen = new BodyForm()
    const $ = cheerio.load(data)
    const file = $('input[name="file"]').attr('value')
    bodyFormThen.append('file', file)
    bodyFormThen.append('convert', "Convert WebP to MP4!")
    axios({
     method: 'post', url: 'https://ezgif.com/webp-to-mp4/' + file, data: bodyFormThen, headers: {
      'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
     }}).then(({
      data
     }) => {
     const $ = cheerio.load(data)
     const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
     resolve({
      status: true, result: result
     })
    }).catch((err) =>
     reject({
      message: "Slakkk"
     }))
   }).catch(reject)
  })
 }

 function levelPatent(groupId, id) {
  const _messageCount = JSON.parse(fs.readFileSync('./db/FilesJson/messages.json'));
  const messageLevel = _messageCount.groups.find(obj => obj.groupId === groupId)?.users[id] || 0;

  var patent = '';
  if (Number(messageLevel) < 10) {
   patent = {
    nivel: '1',
    totalMessage: messageLevel,
    classification: 'Private I🥉'
   };
  } else if (Number(messageLevel) < 20) {
   patent = {
    nivel: '2',
    totalMessage: messageLevel,
    classification: 'Private II🥉'
   };
  } else if (Number(messageLevel) < 30) {
   patent = {
    nivel: '3',
    totalMessage: messageLevel,
    classification: 'Private III🥉'
   };
  } else if (Number(messageLevel) < 40) {
   patent = {
    nivel: '4',
    totalMessage: messageLevel,
    classification: 'Private IV🥉'
   };
  } else if (Number(messageLevel) < 50) {
   patent = {
    nivel: '5',
    totalMessage: messageLevel,
    classification: 'Private V🥉'
   };
  } else if (Number(messageLevel) < 60) {
   patent = {
    nivel: '6',
    totalMessage: messageLevel,
    classification: 'Primeira classe privada I🥈'
   };
  } else if (Number(messageLevel) < 70) {
   patent = {
    nivel: '7',
    totalMessage: messageLevel,
    classification: 'Primeira classe privada II🥈'
   };
  } else if (Number(messageLevel) < 80) {
   patent = {
    nivel: '8',
    totalMessage: messageLevel,
    classification: 'Primeira classe privada III🥈'
   };
  } else if (Number(messageLevel) < 90) {
   patent = {
    nivel: '9',
    totalMessage: messageLevel,
    classification: 'Primeira classe privada IV🥈'
   };
  } else if (Number(messageLevel) < 100) {
   patent = {
    nivel: '10',
    totalMessage: messageLevel,
    classification: 'Primeira classe privada V🥈'
   };
  } else if (Number(messageLevel) < 110) {
   patent = {
    nivel: '11',
    totalMessage: messageLevel,
    classification: 'Especialista I🥇'
   };
  } else if (Number(messageLevel) < 120) {
   patent = {
    nivel: '12',
    totalMessage: messageLevel,
    classification: 'Especialista II🥇'
   };
  } else if (Number(messageLevel) < 130) {
   patent = {
    nivel: '13',
    totalMessage: messageLevel,
    classification: 'Especialista III🥇'
   };
  } else if (Number(messageLevel) < 140) {
   patent = {
    nivel: '14',
    totalMessage: messageLevel,
    classification: 'Especialista IV🥇'
   };
  } else if (Number(messageLevel) < 150) {
   patent = {
    nivel: '15',
    totalMessage: messageLevel,
    classification: 'Especialista V🥇'
   }
  } else if (Number(messageLevel) < 160) {
   patent = {
    nivel: '16',
    totalMessage: messageLevel,
    classification: 'Corporal I🏆'
   };
  } else if (Number(messageLevel) < 170) {
   patent = {
    nivel: '17',
    totalMessage: messageLevel,
    classification: 'Corporal II🏆'
   };
  } else if (Number(messageLevel) < 180) {
   patent = {
    nivel: '18',
    totalMessage: messageLevel,
    classification: 'Corporal III🏆'
   };
  } else if (Number(messageLevel) < 190) {
   patent = {
    nivel: '19',
    totalMessage: messageLevel,
    classification: 'Corporal IV🏆'
   };
  } else if (Number(messageLevel) < 200) {
   patent = {
    nivel: '20',
    totalMessage: messageLevel,
    classification: 'Sargento I💎'
   };
  } else if (Number(messageLevel) < 300) {
   patent = {
    nivel: '30',
    totalMessage: messageLevel,
    classification: 'Sargento II💎'
   };
  } else if (Number(messageLevel) < 400) {
   patent = {
    nivel: '40',
    totalMessage: messageLevel,
    classification: 'Sargento III💎'
   };
  } else if (Number(messageLevel) < 500) {
   patent = {
    nivel: '50',
    totalMessage: messageLevel,
    classification: 'Sargento IV💎'
   };
  } else if (Number(messageLevel) < 600) {
   patent = {
    nivel: '60',
    totalMessage: messageLevel,
    classification: 'Sargento V💎'
   };
  } else if (Number(messageLevel) < 700) {
   patent = {
    nivel: '70',
    totalMessage: messageLevel,
    classification: 'O Sargento I🐂'
   };
  } else if (Number(messageLevel) < 800) {
   patent = {
    nivel: '80',
    totalMessage: messageLevel,
    classification: 'O Sargento II🐂'
   };
  } else if (Number(messageLevel) < 900) {
   patent = {
    nivel: '90',
    totalMessage: messageLevel,
    classification: 'O Sargento III🐂'
   };
  } else if (Number(messageLevel) < 1000) {
   patent = {
    nivel: '100',
    totalMessage: messageLevel,
    classification: 'O Sargento IV🐂'
   };
  } else if (Number(messageLevel) < 1100) {
   patent = {
    nivel: '110',
    totalMessage: messageLevel,
    classification: 'O Sargento V🐂'
   };
  } else if (Number(messageLevel) < 1200) {
   patent = {
    nivel: '120',
    totalMessage: messageLevel,
    classification: 'Sargento Primeira Classe I🔮'
   };
  } else if (Number(messageLevel) < 1300) {
   patent = {
    nivel: '130',
    totalMessage: messageLevel,
    classification: 'Sargento Primeira Classe II🔮'
   };
  } else if (Number(messageLevel) < 1400) {
   patent = {
    nivel: '140',
    totalMessage: messageLevel,
    classification: 'Sargento Primeira Classe III🔮'
   };
  } else if (Number(messageLevel) < 1500) {
   patent = {
    nivel: '150',
    totalMessage: messageLevel,
    classification: 'Sargento Primeira Classe IV🔮'
   };
  } else if (Number(messageLevel) < 1600) {
   patent = {
    nivel: '160',
    totalMessage: messageLevel,
    classification: 'Sargento Primeira Classe V🔮'
   };
  } else if (Number(messageLevel) < 1700) {
   patent = {
    nivel: '170',
    totalMessage: messageLevel,
    classification: 'Sargento-mor I🕴'
   };
  } else if (Number(messageLevel) < 1800) {
   patent = {
    nivel: '180',
    totalMessage: messageLevel,
    classification: 'Sargento-mor II🕴'
   };
  } else if (Number(messageLevel) < 1900) {
   patent = {
    nivel: '190',
    totalMessage: messageLevel,
    classification: 'Sargento-mor III🕴'
   };
  } else if (Number(messageLevel) < 2000) {
   patent = {
    nivel: '200',
    totalMessage: messageLevel,
    classification: 'Sargento-mor IV🕴'
   };
  } else if (Number(messageLevel) < 2100) {
   patent = {
    nivel: '210',
    totalMessage: messageLevel,
    classification: 'Sargento-mor V🕴'
   };
  } else if (Number(messageLevel) < 2200) {
   patent = {
    nivel: '220',
    totalMessage: messageLevel,
    classification: 'Primeiro sargento I🛐'
   };
  } else if (Number(messageLevel) < 2300) {
   patent = {
    nivel: '230',
    totalMessage: messageLevel,
    classification: 'Primeiro sargento II🛐'
   };
  } else if (Number(messageLevel) < 2400) {
   patent = {
    nivel: '240',
    totalMessage: messageLevel,
    classification: 'Primeiro sargento III🛐'
   };
  } else if (Number(messageLevel) < 2500) {
   patent = {
    nivel: '250',
    totalMessage: messageLevel,
    classification: 'Primeiro sargento IV🛐'
   };
  } else if (Number(messageLevel) < 2600) {
   patent = {
    nivel: '260',
    totalMessage: messageLevel,
    classification: 'Primeiro sargento V🛐'
   };
  } else if (Number(messageLevel) < 2700) {
   patent = {
    nivel: '270',
    totalMessage: messageLevel,
    classification: 'Sargento major I☢️'
   };
  } else if (Number(messageLevel) < 2800) {
   patent = {
    nivel: '280',
    totalMessage: messageLevel,
    classification: 'Sargento major II☢️'
   };
  } else if (Number(messageLevel) < 2900) {
   patent = {
    nivel: '290',
    totalMessage: messageLevel,
    classification: 'Sargento major III☢️'
   };
  } else if (Number(messageLevel) < 3000) {
   patent = {
    nivel: '300',
    totalMessage: messageLevel,
    classification: 'Sargento major IV☢️'
   };
  } else if (Number(messageLevel) < 3100) {
   patent = {
    nivel: '310',
    totalMessage: messageLevel,
    classification: 'Sargento major V☢️'
   };
  } else if (Number(messageLevel) < 3200) {
   patent = {
    nivel: '320',
    totalMessage: messageLevel,
    classification: 'Sargento major do comando I☠️'
   };
  } else if (Number(messageLevel) < 3300) {
   patent = {
    nivel: '330',
    totalMessage: messageLevel,
    classification: 'Sargento major do comando II☠️'
   };
  } else if (Number(messageLevel) < 3400) {
   patent = {
    nivel: '340',
    totalMessage: messageLevel,
    classification: 'Sargento major do comando III☠️'
   };
  } else if (Number(messageLevel) < 3500) {
   patent = {
    nivel: '350',
    totalMessage: messageLevel,
    classification: 'Sargento major do comando IV☠️'
   };
  } else if (Number(messageLevel) < 3600) {
   patent = {
    nivel: '360',
    totalMessage: messageLevel,
    classification: 'Sargento major do comando V☠️'
   };
  } else if (Number(messageLevel) < 3700) {
   patent = {
    nivel: '370',
    totalMessage: messageLevel,
    classification: 'Sargento Major do Exército I🥷🏼'
   };
  } else if (Number(messageLevel) < 3800) {
   patent = {
    nivel: '380',
    totalMessage: messageLevel,
    classification: 'Sargento Major do Exército II🥷🏼'
   };;
  } else if (Number(messageLevel) < 3900) {
   patent = {
    nivel: '390',
    totalMessage: messageLevel,
    classification: 'Sargento Major do Exército III🥷🏼'
   };
  } else if (Number(messageLevel) < 4000) {
   patent = {
    nivel: '400',
    totalMessage: messageLevel,
    classification: 'Sargento Major do Exército IV🥷🏼'
   };
  } else if (Number(messageLevel) < 4100) {
   patent = {
    nivel: '500',
    totalMessage: messageLevel,
    classification: 'Sargento Major do Exército V🥷🏼'
   };
  }
  return patent;
 }

 function baileysVersion() {
  return new Promise((resolve, reject) => {
   const {
    fetchLatestBaileysVersion
   } = require('@adiwajshing/baileys');
   fetchLatestBaileysVersion().then(({
    version
   }) => {
    resolve(version);
   }, (err) => {
    reject(err);
   });
  });
 }

 function messageConnection(lolizita) {
  lolizita.onWhatsApp(archive.settings.value.owner[0]).then(([result]) => {
   if (result.exists !== true) return;
   lolizita.sendMessage(archive.settings.value.owner[0], {
    text: archive.mess.value.mess.connected()
   });
  });
 }

 module.exports = {
  getGroupAdmins,
  getRandom,
  getExtension,
  getBuffer,
  fetchJson,
  sleep,
  runtime,
  isUrl,
  getFileBuffer,
  readMore,
  togif,
  levelPatent,
  baileysVersion,
  messageConnection 
 }