const fs = require('fs');
const messages = require('../db/database/menu');

module.exports = {
 archive: {
  _afk: {
   fileName: './db/FilesJson/afks.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/afks.json'))
  },
  welcome: {
   fileName: './db/FilesJson/welcome.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/welcome.json'))
  },
  antifake: {
   fileName: './db/FilesJson/antifake.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/antifake.json'))
  },
  antiListaNegra: {
   fileName: './db/FilesJson/listaNegra.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/listaNegra.json'))
  },
  _messageCount: {
   fileName: './db/FilesJson/messages.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/messages.json'))
  },
  textWell: {
   fileName: './db/FilesJson/textWelcome.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/textWelcome.json'))
  },
  _simih: {
   fileName: './db/FilesJson/simih.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/simih.json'))
  },
  antilink: {
   fileName: './db/FilesJson/antilink.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/antilink.json'))
  },
  antiViewOnce: {
   fileName: './db/FilesJson/antiViewOnce.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/antiViewOnce.json'))
  },
  addBanJson: {
   fileName: './db/FilesJson/addBan.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/addBan.json'))
  },
  listGroup: {
   fileName: './db/FilesJson/listGroup.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/listGroup.json'))
  },
  _pushNames: {
   fileName: './db/FilesJson/pushname.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/pushname.json'))
  },
  groupDays: {
   fileName: './db/FilesJson/times.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/times.json'))
  },
  registerError: {
   fileName: './db/FilesJson/registerError.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/registerError.json'))
  },
  changePrefix: {
   fileName: './db/FilesJson/prefix.json',
   value: JSON.parse(fs.readFileSync('./settings/prefix.json'))
  },
  mess: {
   fileName: './db/database/menu',
   value: messages
  },
  settings: {
   fileName: './configure aqui.js',
   value: require('../configure aqui.js')
  },
  cash: {
   fileName: './db/FilesJson/dinheiro.json',
   value: JSON.parse(fs.readFileSync('./db/FilesJson/dinheiro.json'))
  }
 }
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
 fs.unwatchFile(file);
 let {
  bannerText
 } = require('../db/lib/banner');
 console.log(bannerText(`Update file: ${__filename}`).string);
 delete require.cache[file];
 require(file);
});