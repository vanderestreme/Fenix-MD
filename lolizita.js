const {
 makeWASocket,
 WAProto,
 mentionedJid,
 Mimetype,
 MessageType,
 downloadMediaMessage,
 getDevice
} = require("@adiwajshing/baileys");

// Módulos.
const fs = require('fs');
const util = require('util');
const axios = require('axios');
const chalk = require('chalk');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment-timezone');
const speed = require('performance-now');
const execute = util.promisify(require('child_process').exec);
const yts = require('yt-search');
const {
 exec
} = require("child_process");

// Arquivos js
const {
 color
} = require('./db/lib/color');

const {
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
 levelPatent
} = require('./db/lib/functions');

const {
 linguagem,
 mess
} = require('./db/database/menu');

const {
 owner,
 compreSuaApikey,
 api
} = require('./configure aqui.js');

const {
 isFiltered,
 addFilter
} = require('./db/lib/antiflood.js');

const {
 getAfk,
 addAfk,
 removeAfk,
 getRemoteAfk,
 remAfk,
 addMessage,
 savePushName,
 privateMember,
 deleteMembersCount,
 firstMessage,
 messageOwner,
 getAluguel,
 isGetAluguel,
 registreErrs,
 addCashMessage,
 getCashNumber,
 removeCash,
 stealCash,
 addCash,
 getCash,
 donateCash,
 getRegisteredRError,
 contactOwner,
 cashGet,
 toJson,
 groupMessage,
 reacting,
 statusBot,
 checkApikey
} = require('./db/lib/_ModuFunctions');

module.exports = lolizita = async (lolizita, mek, archive) => {
 try {
  const from = mek.key.remoteJid;
  const content = JSON.stringify(mek.message);
  const type = Object.keys(mek.message).find((key) => !['senderKeyDistributionMessage', 'messageContextInfo'].includes(key));
  const prefix = archive.changePrefix.value.find((obj) => obj.groupId === from)?.prefix || '/';

  //read messages
  lolizita.readMessages([mek.key]);

  const budy = (type === 'conversation') ? mek.message.conversation: (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text: ''
  const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation: (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption: (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption: (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text: (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ? mek.message[type].singleSelectReply.selectedRowId: (type == 'lolizita.sendMessageButtonMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId: (type == 'stickerMessage') && ((mek.message[type].fileSha256.toString('base64')) !== null && (mek.message[type].fileSha256.toString('base64')) !== undefined) ? (mek.message[type].fileSha256.toString('base64')): "" || mek.message[type]?.selectedButtonId || ""

  const command = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase(): '';
  const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase();
  const isCmd = body.startsWith(prefix);
  const args = body.trim().split(/ +/).slice(1);
  const text = args.join(' ');

  /* BOT INFO */
  const me = lolizita?.user;
  const nameBot = me?.name || "Fenix - MD";
  const botNumber = lolizita.user.id.split(':')[0] + '@s.whatsapp.net';

  /* GROUP INFO */
  const isGroup = from.endsWith('@g.us');
  const sender = isGroup ? (mek.key.participant ? mek.key.participant: mek.participant): mek.key.remoteJid;
  const groupMetadata = isGroup ? await lolizita.groupMetadata(from): {};
  const groupId = isGroup ? groupMetadata.id: '';
  const groupOwner = isGroup ? groupMetadata?.subjectOwner === undefined ? groupMetadata.id.split('-')[0] + "@s.whatsapp.net": groupMetadata?.subjectOwner: '';
  const groupDesc = isGroup ? groupMetadata.desc: '';
  const groupName = isGroup ? groupMetadata.subject: '';
  const groupMembers = isGroup ? groupMetadata.participants: [];
  const participants = isGroup ? await groupMetadata.participants: '';
  const memberIds = isGroup ? participants.map((obj) => obj.id): [];
  const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id): '';
  const isGroupAdmins = isGroup ? groupAdmins.includes(sender): false;
  const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;

  /* INFO ONWER */
  const isOwner = owner.includes(sender);
  const nameOwner = archive._pushNames.value.find(v => v.id === owner[0])?.pushName;
  const pushname = mek.pushName || "-";

  /* CONST GET */
  const getPushName = (id) => archive._pushNames.value.find((obj) => obj.id === id)?.pushName;
  const getRecado = (id) => lolizita.fetchStatus(id);
  const getMessagePrivado = (userId) => archive._messageCount.value.users.find(obj => obj.id === userId)?.total || 0;
  const getTotalMessageGroup = (userId, groupId) => archive._messageCount.value.groups.find(obj => obj.groupId === groupId)?.users[userId] || 0;
  const getGroupMessageTotal = (group) => archive._messageCount.value?.groups.find((obj) => obj.groupId === group)?.total || 0;

  /* TIME MENU */
  const hr = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
  const timestamp = speed();
  const latensi = speed() - timestamp;
  const enter = "\n";

  /* FUNÇÕES ANTI */
  const isWelcome = isGroup ? archive.welcome.value.includes(from): true
  const isAntiLink = isGroup ? archive.antilink.value.includes(from): true
  const isViewOnce = isGroup ? archive.antiViewOnce.value.includes(from): true
  const isAntiFake = isGroup ? archive.antifake.value.includes(from): true
  const isListaNegra = isGroup ? archive.antiListaNegra.value.includes(from): true;
  const islistGroup = isGroup ? archive.listGroup.value.includes(from): false;
  const isBanned = isGroup ? archive.addBanJson.value.includes(sender): false;

  const isSimih = archive._simih.value.findIndex(x => x === from);

  const enviar = (content, type, options = {}) => {
   const isFullUrl = (url) => new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/, 'gi').test(url);
   const mediaKeys = ['image',
    'video',
    'sticker',
    'audio',
    'document',
    'history',
    'md-app-state'];
   options[type || 'text'] = isFullUrl(content) && mediaKeys.includes(type) ? {
    url: content
   }: content;
   return lolizita.sendMessage(from, options, {
    quoted: mek
   });
  };

  const reply = (caption) => {
   lolizita.sendMessage(from, {
    text: util.inspect(caption)
   }, {
    quoted: mek
   });
  }

  // Mencionador
  const mentions = (teks, memberr, id) => {
   (id == null || id == undefined || id == false) ? lolizita.sendMessage(from, {
    text: teks.trim(), mentions: memberr
   }, {
    quoted: mek
   }): lolizita.sendMessage(from, {
    text: teks.trim(), mentions: [memberr]}, {
    quoted: mek
   });
  };

  // Funções afk
  getRemoteAfk(sender, from, pushname, enviar, isGroup);
  remAfk(sender, from);

  // Função mensagem
  privateMember(sender, from, isGroup, lolizita, pushname, prefix, mek);

  // Save pushname
  savePushName(sender, pushname);

  // Contador
  addMessage(sender, from, isGroup);

  // Adiciona 500 de cash
  groupMessage(sender, from, enviar, isGroup);


  const getInfoMessage = isGroup ? archive._messageCount.value.groups.find((obj) => obj.groupId === from): [];
  const idMembers = isGroup ? Object.keys(getInfoMessage.users): [];
  const messageMembers = isGroup ? Object.values(getInfoMessage.users): [];
  const membersId = isGroup ? groupMembers.map(({
   id
  }) => id): [];
  const ghosts = isGroup ? membersId.filter(id => !getTotalMessageGroup(id, from) && botNumber !== id): [];

  deleteMembersCount(from, membersId);

  // Função primeira mensagem
  firstMessage(from, isGroup, sender, pushname, prefix, lolizita, mek);

  const afkIds = (mek.message[type]?.contextInfo?.mentionedJid || []).filter(x => getAfk(x, from));
  if (afkIds.length) {
   mentionedJidAfk = mek.message[type].contextInfo.mentionedJid;
   if (mentionedJidAfk.length > 1) {
    enviar('Vc marcou algumas pessoas que estão em afk!');
   } else {
    enviar(`*Esse participante está em afk; ausente!* ❌\n\nMotivo: ${getAfk(afkIds[0], from).reason}`);
   }
  }

  /* ALUGUEL TIME */
  messageOwner(lolizita, from, prefix);

  //TIPOS DE MENSAGENS
  const isMedia = (type === 'imageMessage' || type === 'videoMessage')
  const isQuotedMsg = (type == 'extendedTextMessage')
  const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true: false: false
  const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true: false: false
  const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true: false: false
  const tipoMensagem = type == 'audioMessage' ? 'Audio': type == 'stickerMessage' ? 'Sticker': type == 'imageMessage' ? 'Imagem': type == 'videoMessage' ? 'Video': type == 'documentMessage' ? 'Documento': type == 'contactMessage' ? 'Contato': type == 'locationMessage' ? 'Localização': 'Mensagem'

  if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m COMANDO \x1b[1;37m]', color(comando, "yellow"), 'do', color(pushname, "yellow"), 'Horas:', color(hr));
  if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m COMANDO \x1b[1;37m]', color(comando, "yellow"), 'do', color(pushname, "yellow"), 'Grupo:', color(groupName, "yellow"), 'Horas:', color(hr));
  if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MENSAGEM \x1b[1;37m]', color(tipoMensagem, "yellow"), 'do', color(pushname, "yellow"), 'Grupo:', color(groupName, "yellow"), 'Horas:', color(hr));
  if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MENSAGEM \x1b[1;37m]', color(tipoMensagem, "yellow"), 'do', color(pushname, "yellow"), 'Horas:', color(hr));

  // Anti visualização única
  const isViewOnceMessage = type == 'viewOnceMessage' ? Object.keys(mek.message.viewOnceMessage.message)[0]: '';
  if (archive.antiViewOnce.value.indexOf(from) !== -1) {
   switch (isViewOnceMessage) {
    case 'imageMessage':
     var viewOnce = mek.message.viewOnceMessage.message.imageMessage;
     viewOnce.viewOnce = false;
     viewOnce.contextInfo = {
      isForwarded: true,
      forwardingScore: 1
     }
     lolizita.relayMessage(from, {
      imageMessage: viewOnce
     }, {
      messageid: prefix + 'BAE5' + require('crypto').randomBytes(6).toString('hex').toUpperCase(), additionalAttributes: {}});
     enviar('viewOnce detectado');
     break;

    case 'videoMessage':
     var viewOnce = mek.message.viewOnceMessage.message.videoMessage;
     viewOnce.viewOnce = false;
     viewOnce.contextInfo = {
      isForwarded: true,
      forwardingScore: 1
     }
     lolizita.relayMessage(from, {
      videoMessage: viewOnce
     }, {
      messageid: prefix + 'BAE5' + require('crypto').randomBytes(6).toString('hex').toUpperCase(), additionalAttributes: {}});
     break;
    enviar('viewOnce detectado');
   }
  }

  const selectedId = type == "listResponseMessage" ? mek.message.listResponseMessage?.singleSelectReply.selectedRowId: '';

  switch (selectedId) {
   case 'puttingwelcome':
    enviar(`1° Como por uma mensagem personalizada de bem vindo;\n\nUse: ${prefix}addwelcome Bem vindo #membro`);
    break;

   case 'welcomeinformation':
    enviar(`⚠️ comando addwelcome tem a funcionalidade de por uma mensagem específica só para o seu grupo.\nQuando a pessoa sair, e quando a pessoa entrar!\n• Para ligar:\n${prefix}addwelcome [ Seu welcome ]\n\n• Para Apaga ou Desligar:
     ${prefix}remwelcome\n\n• Para trocar a mensagem do welcome, é a mesma coisa do comando acima! Só basta por uma mensagem nova;\n\nObservação: Para funcionar, ligue o comando welcome;`);
    break;

   case 'removewelcome':
    enviar(`Para remover ou Apagar a mensagem do welcome;
     Use: ${prefix}remwelcome\n\nDepois que usar o comando, o bot automaticamente removerá a sua mensagem de welcome e ficará um welcome normal!`);
    break;

   case 'tamgember':
    enviar(`Para marcar o Nome/Número do membro, tem que por: #membro, na mensagem do welcome!\n\nExemplo: ${prefix}addwelcome Bem vindo ao grupo: #membro!\n\n⚠️ Obs: #membro, na sua mensagem do welcome, irá marcar o Nome do membro, ou poderá marcar o Número do membro novo!`);
    break;

   case 'taggroupname':
    enviar(`Para marcar o nome do grupo, põe: #grupo, na sua mensagem do welcome!!\n\nExemplo: ${prefix}addwelcome Bem vindo ao grupo: #grupo\n\n⚠️ Obs: #grupo, irá marcar somente o nome do grupo;`);
    break;

   case 'groupdescription':
    enviar(`Como fazer para por a descrição do grupo na sua mensagem do welcome?\n\nFácil, apenas basta colocar: #desc, na sua mensagem do Welcome!\n\nExemplo: ${prefix}addwelcome Bem vindo, leia: #desc`);
    break;

   case 'messagebye':
    enviar(`Para por uma mensagem de saída, é simples. Basta usar:\n\nExemplo: ${prefix}exitwelcome tchau #membro\n\nObs: Tem como por descrição, marcar o membro e marcar o nome do grupo!`);
    break;

   case 'changingmessage':
    enviar(`É preciso usar o mesmo comando outra vez!\n\nExemplo: ${prefix}exitwelcome Tchau #membro\n\n⚠️ Obs: Irá alterar a antiga mensagem do welcome/saída.`);
    break;
  }

  // Anti links
  if (isUrl(budy) && isAntiLink && isGroupAdmins && isBotGroupAdmins) {
   if (budy.match(await lolizita.groupInviteCode(from))) return enviar('Link do Grupo, não irei remover..')
   enviar('*Link detectado, porém usuário é admin*')
  }

  // Anti links
  if (isUrl(budy) && isAntiLink && !isGroupAdmins && isBotGroupAdmins) {
   enviar('*Link detectado, punindo usuário...*');
   lolizita.groupParticipantsUpdate(from, [sender], "remove");
   lolizita.sendMessage(from, {
    delete: {
     remoteJid: from, fromMe: false, id: mek.key.id, participant: sender
    }});
 }

 if (getRegisteredRError(comando, sender)?.total > 3 && !isOwner && isCmd) return enviar(`*Comando bloqueado* ❌\n\n⚠️ Você foi restringido de utilizar este comando, por erros e tentivas de uso mal sucedidas.`)

 if (isGroup && !isGetAluguel(from, isGroup) && isCmd && !isOwner) return enviar(`⚠️ ADQUIRA PREMIUM! ‼️\n\nPara adquirir premium, contate meu dono:\n× wa.me/${owner[0].split('@')[0]} - ${nameOwner}\n\n📵 Obs: Só chame meu dono caso for comprar Premium para seu grupo.`);

 if (isBanned && isCmd && !isOwner) return enviar(mess.banned());
 if (islistGroup && isCmd && !isOwner) return;

 if (isCmd && isFiltered(from) && !isGroup && !isOwner) {
  console.log(color('SPAM DE COMANDOS', 'red'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'yellow'), color(comando), 'DE:', color(pushname))
  return lolizita.sendMessage(from, {
   text: `*Flood de comandos detectado!* ❌\n\n${pushname} Espere um intervalo de 20 segundos para usar outro comando!`
  }, {
   quoted: mek
  });
 };

 if (isCmd && isFiltered(from) && isGroup) {
  console.log(color('SPAM DE COMANDOS', 'red'), color(moment.tz('America/Sao_Paulo').format('HH:mm:ss'), 'yellow'), color(comando), 'DE:', color(pushname))
  return lolizita.sendMessage(from, {
   text: `*Flood de comandos detectado!* ❌\n\n${pushname} Espere um intervalo de 20 segundos para usar outro comando!`
  }, {
   quoted: mek
  });
 };

 const getRandomMessage = (max = 0, min = 0) => Math.floor(Math.random() * max) + min;
 function usingFunctionMessage (number, isSimih, isCmd) {
  if (isSimih === -1 && isCmd) return;
  const several = ["whatsapp",
   "ratinho",
   "rodrigo faro",
   "amor",
   "preto",
   "racista",
   "funk",
   "angolano",
   "angola",
   "filho",
   "tiringa",
   "cavalo",
   "forro",
   "gaucho",
   "viado",
   "animal",
   "loli",
   "peitos",
   "peito",
   "bunda",
   "lolis",
   "biblia",
   "gostosa",
   "puta",
   "grupo",
   "sexo"];

  if (getRandomMessage(number) === 0) {
   console.log(color('[ Simih ]'), 'Respondendo!');
   fetchJson(`${api}/api/frases?apikey=${compreSuaApikey}`).then((obj) => {
    lolizita.sendMessage(from, {
     text: `🤖 FRASE ALEATÓRIA PASSANDO KKkj! \n\n• ${obj.resultado.frase} - ${obj.resultado.autor}\n`
    });
  }, (err) => console.error('[ Error ] : %s', color(err, 'red')));
 }

 if (getRandomMessage(number) === 1) {
  console.log(color('[ Simih ]'), 'Respondendo!');
  fetchJson(`${api}/api/download/audios?text=${several[Math.floor(Math.random() * several.length)]}&apikey=${compreSuaApikey}`).then((anu) => {
   lolizita.sendMessage(from, {
    audio: {
     url: anu.result.audio
    }, mimetype: 'audio/mp4', ptt: true
   }, {
    quoted: mek
   });
  }, (err) => console.error(' [ Error ] : %s', color(err, 'red')));
 };

 if (getRandomMessage(number) === 3) {
  console.log(color('[ Simih ]'), 'Respondendo!');
  fetchJson(`${api}/api/simi-simi?texto=${budy}&lingua=pt&apikey=${compreSuaApikey}`).then((anu) => {
   if (anu.status === false && anu.code === 403) return;
   lolizita.sendMessage(from, {
    text: anu.result?.resposta || 'hai'
   }, {
    quoted: mek
   });
  },
   (err) => console.error(' [ Error ] : %s', color(err, 'red')));
 };
}

if (isMedia && !isGroup) {
 var {
  addExif,
  getExif
 } = require('./db/lib/idExif');
 if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
  buffer = await lolizita.downloadAndSaveMediaMessage(mek.message[type].contextInfo?.quotedMessage?.imageMessage || mek.message?.imageMessage);
  let ran = getRandom('.webp');
  execute(`ffmpeg -i ${buffer} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${ran}`, async function(err, result) {
   await addExif(`./${ran}`, {
    packname: pushname, author: nameBot
   });
   lolizita.sendMessage(from, {
    sticker: fs.readFileSync(`./${ran}`)}, {
    quoted: mek
   }).finally(() => fs.unlinkSync(`./${ran}`));
  });
 } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
  enviar('✅ Espere! A criação de figurinhas com vídeos e/ou Gif, pode demorar um pouco. ⏳\n\n❌ Caso a figurinha animada não seja recebida dentro de 3 minutos.. Use o comando novamente!');
  let ran = getRandom('.webp');
  buffer = await lolizita.downloadAndSaveMediaMessage(mek.message[type].contextInfo?.quotedMessage?.videoMessage || mek.message?.videoMessage);
  execute(`ffmpeg -i ${buffer} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${ran}`, async function(err, res) {
   await addExif(`./${ran}`, {
    packname: pushname, author: nameBot
   });
   lolizita.sendMessage(from, {
    sticker: {
     url: `./${ran}`
    }}, {
    quoted: mek
   }).finally(() => fs.unlinkSync(`./${ran}`));
  });
 };
}

usingFunctionMessage(100,
 isSimih,
 isCmd);

// Add 1 cash por mensagem
addCashMessage(sender,
 pushname);

// ATUALIZADO STATUS DO BOT
statusBot(lolizita,
 runtime);

if (budy.toLowerCase() == 'external') {
 lolizita.sendMessage(from, {
  caption: 'aaaaaaa',
  document: Buffer.from(''),
  fileName: 'nome do arquivo',
  mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  contextInfo: {
   externalAdReply: {
    sourceUrl: 'url',
    title: 'titulo',
    thumbnail: mess.logo()
   }
  }
 });
}

   /*
lolizita.sendMessage(from, {image: mess.logo(), contextInfo: {
        externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         showAdAttribution: true,
         sourceUrl: 'https://youtube.com',
         mediaUrl: 'https://youtube.com',
         title: lolizita.user?.name || "-",
         thumbnail: mess.logo()
        }
       }})
      */
 
const cmdBase = [{
 keys: ['menu',
  'help',
  'list',
  prefix],
 execution: async function () {
  addFilter(from);
  lolizita.sendExternalAdReply(from,
   `𒄬 Seu money total: ${getCash(sender)}`,
   linguagem.menu(prefix, hr, me),
   `Opaa ${pushname}!`,
   archive.mess.value.mess.logo(),
   [{
    buttonId: `${prefix}status`,
    buttonText: {
     displayText: `💢 [ STATUS ] `
    },
    type: 1
   },
    {
     buttonId: `${prefix}grupo`,
     buttonText: {
      displayText: `🙋🏻‍♂️ [ GRUPO ] `
     },
     type: 1
    }],
   {
    quoted: mek
   });
 }
},
 {
  keys: ['grupo'],
  execution: async function () {
   addFilter(from);
   lolizita.sendExternalAdReply(from,
    `𒄬 Seu money total: ${getCash(sender)}`,
    linguagem.grupo(prefix, hr, me),
    `Olá ${pushname}!`,
    archive.mess.value.mess.logo(),
    [{
     buttonId: `${prefix}menu`,
     buttonText: {
      displayText: `💢 [ MENU ] `
     },
     type: 1
    },
     {
      buttonId: `${prefix}logos`,
      buttonText: {
       displayText: `💮 [ MENU LOGOS ] `
      },
      type: 1
     }],
    {
     quoted: mek
    });
  }
 },
 {
  keys: ['logos'],
  execution: async function() {
   addFilter(from);
   lolizita.sendExternalAdReply(from,
    `𒄬 Seu money total: ${getCash(sender)}`,
    linguagem.logos(prefix, hr, me),
    `Olá ${pushname}!`,
    archive.mess.value.mess.logo(),
    [{
     buttonId: `${prefix}menu`,
     buttonText: {
      displayText: `💢 [ MENU ] `
     },
     type: 1
    },
     {
      buttonId: `${prefix}jogos`,
      buttonText: {
       displayText: `🎮 [ JOGOS ] `
      },
      type: 1
     }],
    {
     quoted: mek
    });
  }
 },
 {
  keys: ['jogos'],
  execution: async function() {
   addFilter(from);
   lolizita.sendExternalAdReply(from,
    `𒄬 Seu money total: ${getCash(sender)}`,
    linguagem.jogos(prefix, hr, me),
    `Olá ${pushname}!`,
    archive.mess.value.mess.logo(),
    [{
     buttonId: `${prefix}menu`,
     buttonText: {
      displayText: `💢 [ MENU ] `
     },
     type: 1
    },
     {
      buttonId: `${prefix}criador`,
      buttonText: {
       displayText: `🚶🏻 [ CRIADOR ] `
      },
      type: 1
     }],
    {
     quoted: mek
    });
  }
 },
 {
  keys: ['criador'],
  execution: async function() {
   addFilter(from);
   if (!isOwner) return lolizita.templateMessage(from, `Oi ${pushname}! Deseja algo do meu Criador?`, [{
    title: "MEU CRIADOR; SÓ CHAME SE FOR ALGO IMPORTANTE!", rows: [{
     title: "💢 Contato/Número",
     rowId: `${prefix}contato`
    }]}], {
    quoted: mek
   });
   lolizita.sendExternalAdReply(from, `𒄬 Seu money total: ${getCash(sender)}`, linguagem.criador(prefix, hr, me), `Opaa ${pushname}!`, archive.mess.value.mess.logo(), [{
    buttonId: `${prefix}menu`, buttonText: {
     displayText: `💢 [ MENU ] `
    }, type: 1
   }, {
    buttonId: `${prefix}animes`, buttonText: {
     displayText: `🤯 [ ANIMES ] `
    }, type: 1
   }], {
    quoted: mek
   });
  }
 },
 {
  keys: ['animes'],
  execution: async function() {
   addFilter(from);
   lolizita.sendExternalAdReply(from, `𒄬 Seu money total: ${getCash(sender)}`, linguagem.animes(prefix, hr, me), `Opaa ${pushname}!`, archive.mess.value.mess.logo(), [{
    buttonId: `${prefix}menu`, buttonText: {
     displayText: `💢 [ MENU ] `
    }, type: 1
   }, {
    buttonId: `${prefix}download`, buttonText: {
     displayText: `🔗 [ DOWNLOAD ] `
    }, type: 1
   }], {
    quoted: mek
   });
  }
 },
 {
  keys: ['download'],
  execution: async function() {
   addFilter(from);
   lolizita.sendExternalAdReply(from,
    `𒄬 Seu money total: ${getCash(sender)}`,
    linguagem.download(prefix, hr, me),
    `Olá ${pushname}!`,
    archive.mess.value.mess.logo(),
    [{
     buttonId: `${prefix}menu`,
     buttonText: {
      displayText: `💢 [ MENU ] `
     },
     type: 1
    },
     {
      buttonId: `${prefix}consultas`,
      buttonText: {
       displayText: `🍪 [ CONSULTAS ] `
      },
      type: 1
     }],
    {
     quoted: mek
    });
  }
 },
 {
  keys: ['consultas'],
  execution: async function() {
   addFilter(from);
   lolizita.sendExternalAdReply(from, `𒄬 Seu money total: ${getCash(sender)}`, linguagem.consultas(prefix, hr, me), `Olá ${pushname}!`, archive.mess.value.mess.logo(), [{
    buttonId: `${prefix}menu`, buttonText: {
     displayText: `💢 [ MENU ] `
    }, type: 1
   }, {
    buttonId: `${prefix}figurinhas`, buttonText: {
     displayText: `🌐 [ FIGURINHAS ] `
    }, type: 1
   }], {
    quoted: mek
   });
  }
 },
 {
  keys: ['figurinhas'],
  execution: async function() {
   addFilter(from);
   lolizita.sendExternalAdReply(from,
    `𒄬 Seu money total: ${getCash(sender)}`,
    linguagem.figurinhas(prefix, hr, me),
    `Olá ${pushname}!`,
    archive.mess.value.mess.logo(),
    [{
     buttonId: `${prefix}menu`,
     buttonText: {
      displayText: `💢 [ MENU ] `
     },
     type: 1
    },
     {
      buttonId: `${prefix}grupo`,
      buttonText: {
       displayText: `🙋🏻‍♂️ [ GRUPO ] `
      },
      type: 1
     }],
    {
     quoted: mek
    });
  }
 },
 {
  keys: ['perfil',
   'user'],
  execution: async function() {
   addFilter(from);
   const mentionedJid = (mek.message[type].contextInfo?.mentionedJid?.[0] || mek.message[type].contextInfo?.participant || sender).replace(/:\d*?(?=@)/g, '');
   try {
    ppuser = await lolizita.profilePictureUrl(mentionedJid, 'image')
   } catch {
    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
   };
   enviar("*Gerando perfil! Espere um momento..* ⏳");
   lolizita.sendExternalAdReply(from, `𒄬 Seu money total: ${getCash(mentionedJid)}`, await mess.getPerfil(getPushName, getRecado, getMessagePrivado, getTotalMessageGroup, from, mentionedJid, levelPatent, mek), `Olá ${pushname}!`, archive.mess.value.mess.logo(), [{
    buttonId: `${prefix}menu`, buttonText: {
     displayText: `💢 [ MENU ] `
    }, type: 1
   }], {
    quoted: mek
   });
  }
 },
 /* COMANDOS LOGOS */
 {
  keys: ['gay',
   'delete',
   'beautiful',
   'bobross',
   'hitler',
   'notpoutine',
   'poutine',
   'rip',
   'trash',
   'komunis',
   'wasted',
   'circulo',
   'bolsonaro',
   'triggered',
   'embacado',
   'cinza',
   'facepalm',
   'invert',
   'preso',
   'tumulo',
   'rotate',
   'wanted',
   'sepia',
   'patrick',
   'hacker',
   'hacker2'
  ],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (!isQuotedImage) return enviar('❌ É necessário que marque uma foto!');
   enviar('⏳ Espere, processando comando! ⏳');
   lolizita.downloadAndSaveMediaMessage(mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage).then((anu) => {
    let {
     telegraph
    } = require('./db/lib/uploader.js');
    telegraph(anu).then((buffer) => {
     getBuffer(`${api}/api/canvas/${comando}?img=${buffer}&apikey=${compreSuaApikey}`).then((buffer) => {
      enviar(buffer, 'image');
     }).catch((err) => {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError());
      console.log('Error : %s', color(err, 'red'));
     });
    }).catch((err) => enviar(mess.commandError(err)));
   }, (err) => {
    enviar(mess.commandError(err));
   });
  }
 },
 {
  keys: ['natural-leaves',
   'transformer',
   'greenhorror',
   'metallic',
   'sciencefiction',
   'thunder',
   'magmahot',
   'embossed',
   'berry',
   'impressiveglitch',
   'harrypotter',
   'artpaper',
   'neondevilwings',
   'futuristicneon',
   'snow',
   'bearmascot',
   'wonderfulgraffiti',
   'cloud',
   'luxurygold',
   'sandwriting',
   'sandsummer',
   'sandengraved',
   'realisticcloud',
   'summerysand',
   '3dglue',
   'neonlight',
   '1917style',
   'steeltext',
   'metaldarkgold',
   'chocolate',
   'captainamerica',
   'matrix',
   'toxic',
   '3dbox',
   'horrorblood',
   'drop-water',
   'thunder2',
   'blood',
   'lava',
   'black-pink',
   'christmas',
   '3d-gradient',
   'xmascards3d'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(mess.textSyntax());
   if (text.length > 15) return enviar("*Só é permitido no máximo 15 letras!* ❌");
   enviar("Fazendo logo! Espere um momento..");
   fetchJson(`${api}/api/textpro/${comando}?apikey=${compreSuaApikey}&text=${args.join(' ')}`).then(anu => {
    lolizita.sendMessage(from, {
     image: {
      url: anu.resultado
     }, caption: '✅'
    }, {
     quoted: mek
    });
   }).catch((err) => {
    registreErrs(lolizita, comando, err, sender);
    enviar(mess.commandError());
    console.log('Error : %s', color(err, 'red'));
   });
  }
 },
 /* COMANDOS JOGOS */
 {
  keys: ['dado'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const dadus = ["1",
    "2",
    "3",
    "4",
    "5",
    "6"]
   dadu = dadus[Math.floor(Math.random() * dadus.length)]
   lolizita.sendMessage(from, {
    sticker: fs.readFileSync('./db/database/dados/'+dadu+'.webp')}, {
    quoted: mek
   });
  }
 },
 {
  keys: ['slot'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const sotoy = JSON.parse(fs.readFileSync('./db/FilesJson/sotoy.json'))
   const somtoy = sotoy[Math.floor(Math.random() * (sotoy.length))]
   if ((somtoy == '🥑 : 🥑 : 🥑') || (somtoy == '🍉 : 🍉 : 🍉') || (somtoy == '🍓 : 🍓 : 🍓') || (somtoy == '🍎 : 🍎 : 🍎') || (somtoy == '🍍 : 🍍 : 🍍') || (somtoy == '🥝 : 🥝 : 🥝') || (somtoy == '🍑 : 🍑 : 🍑') || (somtoy == '🥥 : 🥥 : 🥥') || (somtoy == '🍋 : 🍋 : 🍋') || (somtoy == '🍐 : 🍐 : 🍐') || (somtoy == '🍌 : 🍌 : 🍌') || (somtoy == '🍒 : 🍒 : 🍒') || (somtoy == '🔔 : 🔔 : 🔔') || (somtoy == '🍊 : 🍊 : 🍊') || (somtoy == '🍇 : 🍇 : 🍇')) {
    var victory = "Você ganhou!!!"
   } else {
    var victory = "Você perdeu..."
   }
   if (victory == "Você ganhou!!!") {
    setTimeout(() => enviar(`Você ganhou🥳🥳🥳!!!`), 1100)
   };
   lolizita.templateImageMessage(from, mess.slot(somtoy), mess.nameEnter(me), {
    image: mess.logo()}, [{
     urlButton: {
      displayText: 'Rest Apis ❄️', url: api
     }}, {
     quickReplyButton: {
      displayText: `〘 Start Slot 〙`, id: prefix + comando
     }}]);
  }
 },
 {
  keys: ['roleta'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const tiro = ["vazio",
    "vazio",
    "vazio",
    "vazio",
    "vazio",
    "vazio",
    "vazio",
    "vazio",
    "pow",
    "pow"]
   const figr = ["pattta1",
    "pattta2",
    "pattta3"]
   tpa = tiro[Math.floor(Math.random() * (tiro.length))]
   tpb = figr[Math.floor(Math.random() * (figr.length))]
   if (tpa == "vazio") {
    var morte = "Você teve sorte dessa vez, o tambor estava vazio."
   } else if (tpa == "pow") {
    var morte = "Tinha uma bala no tambor, POW!"
   }
   if (morte == "Tinha uma bala no tambor, POW!") {
    setTimeout(() => {
     lolizita.sendMessage(from, {
      sticker: fs.readFileSync('./db/database/figurinhas/'+tpb+'.webp')})
    }, 2100)
   }
   setTimeout(() => {
    lolizita.sendMessage(from, {
     text: morte
    }, {
     quoted: mek
    })
   }, 2300)
  }
 },
 {
  keys: ['tagme'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (!isGroup) return enviar(mess.group());
   const tagme = `@${sender.split("@")[0]} 🧙‍♂️`;
   lolizita.sendMessage(from, {
    text: tagme, mentions: [sender]}, {
    quoted: mek
   });
  }
 },
 {
  keys: ['cassino'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (!isGroup) return enviar(mess.group());
   const sotoyMath = JSON.parse(fs.readFileSync('./db/FilesJson/sotoy.json'))
   const soto = [
    '🍊 : 🍊 : 🍐',
    '🍒 : 🔔 : 🍊',
    '🍇 : 🍇 : 🍇',
    '🍊 : 🍋 : 🍒',
    '🔔 : 🍒 : 🍐',
    '🔔 : 🍒 : 🍊',
    '🍊 : 🍋 : 🍒',
    '🍐 : 🍊 : 🍋',
    '🍐 : 🍐 : 🍐',
    '🍊 : 🍒 : 🍒',
    '🔔 : 🔔 : 🔔',
    '🍌 : 🍒 : 🔔',
    '🍐 : 🔔 : 🔔',
    '🍊 : 🍋 : 🍒',
    '🍋 : 🍋 : 🍌',
    '🔔 : 🔔 : 🍇',
    '🔔 : 🍐 : 🍇',
    '🔔 : 🔔 : 🔔',
    '🍒 : 🍒 : 🍒',
    '🍌 : 🍌 : 🍌'
   ]
   const somtoy2 = sotoyMath[Math.floor(Math.random() * sotoyMath.length)]
   if ((somtoy2 == '🥑 : 🥑 : 🥑') || (somtoy2 == '🍉 : 🍉 : 🍉') || (somtoy2 == '🍓 : 🍓 : ??') || (somtoy2 == '🍎 : 🍎 : 🍎') || (somtoy2 == '🍍 : 🍍 : 🍍') || (somtoy2 == '🥝 : 🥝 : 🥝') || (somtoy2 == '🍑 : 🍑 : 🍑') || (somtoy2 == '🥥 : 🥥 : 🥥') || (somtoy2 == '🍋 : 🍋 : 🍋') || (somtoy2 == '🍐 : 🍐 : 🍐') || (somtoy2 == '🍌 : 🍌 : 🍌') || (somtoy2 == '🍒 : 🍒 : 🍒') || (somtoy2 == '🔔 : 🔔 : 🔔') || (somtoy2 == '🍊 : 🍊 : 🍊') || (somtoy2 == '🍇 : 🍇 : 🍇')) {
    var Vitória = "Você ganhou!!!"
   } else {
    var Vitória = "Você perdeu..."
   }
   lolizita.templateImageMessage(from, mess.somtoy2(somtoy2, Vitória), mess.nameEnter(me), {
    image: mess.logo()}, [{
     urlButton: {
      displayText: 'Rest Apis ❄️', url: api
     }}, {
     quickReplyButton: {
      displayText: `〘 Start Cassino 〙`, id: prefix + comando
     }}]);
   if (Vitória == "Você ganhou!!!") {
    setTimeout(() => enviar(`Parabéns você ganhou!`), 1100)
   }
  }
 },
 {
  keys: ['caracoroa'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const cara = fs.readFileSync('./db/database/figurinhas/cara.webp');
   const coroa = fs.readFileSync('./db/database/figurinhas/coroa.webp');
   cararo = ["cara",
    "coroa"]
   fej = cararo[Math.floor(Math.random() * cararo.length)]
   enviar(`você conseguiu: ${fej}`);
   lolizita.sendMessage(from, {
    sticker: fs.readFileSync('./db/database/figurinhas/'+fej+'.webp')}, {
    quoted: mek
   });
  }
 },
 {
  keys: ['roletarussa'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (!isGroup) return enviar(mess.group());
   if (!isGroupAdmins) return enviar(mess.admin());
   if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
   const russianRoulette = participants[Math.floor(Math.random() * (participants.length))];
   lolizita.sendMessage(from, {
    text: 'Roleta russa ativada! Veja agora quem vai ser banido..', mentions: participants.map((obj) => obj.id)}, {
    quoted: mek
   });
   sleep(10000).then(() => lolizita.groupParticipantsUpdate(from, [russianRoulette.id], "remove"));
  }
 },
 {
  keys: ['sn'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (!isGroup) return enviar(mess.group());
   if (text.length < 1) return enviar(`Você deve fazer uma pergunta...\nExemplo: ${prefix}sn O ${pushname} é um baiano preguiçoso?`);
   const sn = ['sim',
    'não']
   enviar(`${text}\n\nSegundo meus cálculos, eu acredito que... ${sn[Math.floor(Math.random() * (sn.length))]}`);
  }
 },
 {
  keys: ['nick',
   'nickname'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (!text) return enviar(`Erro! tente usar este exemplo: ${prefix + comando} Loli`);
   enviar("✓ Espere! Gerando Nicks...");
   fetchJson(api + `/api/nickName?nome=${text}&apikey=${compreSuaApikey}`).then((value) => {
    if (value.status === false) return enviar(valeu.message);
    enviar(value.result.map((v) => v.text).join('\n'));
   }).catch((err) => {
    registreErrs(lolizita, comando, err, sender);
    enviar(mess.commandError());
    console.log('Error : %s', color(err, 'red'));
   });
  }
 },
 {
  keys: ['corno'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return enviar('Você precisa mencionar alguém pra ver o nível do chifre')
   const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
   const percentage = Math.floor(Math.random() * 101);
   if (percentage > 50) {
    teks = `*Após medir o* @${mentionedJid.split('@')[0]} *SUA PORCENTAGEM E DE : ${percentage}% TU E UM BAITA CORNO EM SLK🐂*`
   } else {
    teks = `*Após medir o* @${mentionedJid.split('@')[0]} *SUA PORCENTAGEM E DE : ${percentage}% SUA VEZ DE SER CORNO CHEGARA RLX😴!!*`
   }
   mentions(teks, mentionedJid, true);
  }
 },
 {
  keys: ['amongus'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (!isGroup) return enviar(mess.group());
   if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return enviar('Você precisa mencionar alguém')
   const mentioned = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
   mentions(mess.amongus(mentioned), mentioned, true);
  }
 },
 {
  keys: ['feio',
   'lixo',
   'gado',
   'burro',
   'gordo',
   'pobre',
   'bonito',
   'macaco',
   'gostoso'
  ],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (!isGroup) return enviar(mess.group());
   result = [];
   teks = `O mais *${comando}* é : `;
   for (i = 0; i < 1; i++) {
    martrandom = Math.floor(Math.random() * groupMetadata.participants.length + 0);
    teks += `@${groupMembers[martrandom].id.split('@')[0]}\n`;
    result.push(groupMembers[martrandom].id);
   };
   mentions(teks, result, false);
  }
 },
 {
  keys: ['loli'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   getBuffer(`${api}/api/loli?apikey=${compreSuaApikey}`).then((buffer) => {
    console.log(buffer);
    lolizita.sendMessageButtons(from, '🍪', nameBot, buffer, [{
     buttonId: prefix + command, buttonText: {
      displayText: '[💢] Next >>'
     }, type: 1
    }], {
     quoted: mek
    });
   }, (err) => {
    registreErrs(lolizita, comando, err, sender);
    enviar(mess.commandError(err));
    console.log('Error : %s', color(err, 'red'));
   });
  }
 },
 {
  keys: ['gon',
   'killua',
   'kurapika',
   'leorio',
   'hisoka',
   'netero',
   'pitou',
   'illumi',
   'meruem',
   'machi',
   'shizuku'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   enviar('*Espere! enviando..* ⏳');
   const gis = require('g-i-s');
   gis(`${command} Hunter x Hunter anime`, function(err, result) {
    if (err) {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log('Error : %s', color(err, 'red'));
    } else {
     const filterImage = result.filter(a => a.url.endsWith('.jpg') || a.url.endsWith('.png'));
     getBuffer(filterImage[Math.floor(Math.random() * filterImage.length)]?.url).then((buffer) => {
      lolizita.sendMessageButtons(from, '🍪', nameBot, buffer, [{
       buttonId: prefix + command, buttonText: {
        displayText: '[💢] Next >>'
       }, type: 1
      }], {
       quoted: mek
      });
     }, (err) => {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError(err));
      console.log('Error : %s', color(err, 'red'));
     });
    };
   });
  }
 },
 {
  keys: ['zoro',
   'luffy',
   'nami',
   'sanji',
   'usopp',
   'franky',
   'jinbe',
   'kaido',
   'yamato',
   'oden',
   'robin'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   enviar('*Espere! enviando..* ⏳');
   const gis = require('g-i-s');
   gis(`${command} one piece`,
    function(err, result) {
     if (err) {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError(err));
      console.log('Error : %s', color(err, 'red'));
     } else {
      const filterImage = result.filter(a => a.url.endsWith('.jpg') || a.url.endsWith('.png'));
      getBuffer(filterImage[Math.floor(Math.random() * filterImage.length)]?.url).then((buffer) => {
       lolizita.sendMessageButtons(from, '🍪', nameBot, buffer, [{
        buttonId: prefix + command, buttonText: {
         displayText: '[💢] Next >>'
        }, type: 1
       }], {
        quoted: mek
       });
      }, (err) => {
       registreErrs(lolizita, comando, err, sender);
       enviar(mess.commandError(err));
       console.log('Error : %s', color(err, 'red'));
      });
     };
    });
  }
 },
 {
  keys: ['esdeath',
   'akame',
   'tatsumi',
   'najenda',
   'kurome',
   'bulat',
   'leone',
   'mine',
   'chelsea',
  ],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   enviar('*Espere! enviando..* ⏳');
   const gis = require('g-i-s');
   gis(`${command} akame ga kill anime`,
    function(err, result) {
     if (err) {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError(err));
      console.log('Error : %s', color(err, 'red'));
     } else {
      const filterImage = result.filter(a => a.url.endsWith('.jpg') || a.url.endsWith('.png'));
      getBuffer(filterImage[Math.floor(Math.random() * filterImage.length)]?.url).then((buffer) => {
       lolizita.sendMessageButtons(from, '🍪', nameBot, buffer, [{
        buttonId: prefix + command, buttonText: {
         displayText: '[💢] Next >>'
        }, type: 1
       }], {
        quoted: mek
       });
      }, (err) => {
       registreErrs(lolizita, comando, err, sender);
       enviar(mess.commandError(err));
       console.log('Error : %s', color(err, 'red'));
      });
     };
    });
  }
 },
 {
  keys: ['ero',
   'yuri',
   'ass',
   'foot',
   'orgy',
   'jahy',
   'bdsm',
   'pussy',
   'hentai',
   'thighs',
   'panties',
   'ahegao',
   'blowjob',
   'cuckold',
   'nsfwloli',
   'femdom',
   'sfwneko',
   'tentacles',
   'nsfwneko',
   'masturbation'
  ],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar("*Gerando hentai.. Espere!* ⏳");
   getBuffer(`${api}/api/${command}?apikey=${compreSuaApikey}`).then((buffer) => {
    lolizita.sendMessageButtons(from, '🍪', nameBot, buffer, [{
     buttonId: prefix + command, buttonText: {
      displayText: '[💢] Next >>'
     }, type: 1
    }], {
     quoted: mek
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['googleimage'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   enviar('*Espere! enviando..* ⏳');
   const gis = require('g-i-s');
   gis(text,
    function(err, result) {
     if (err) {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError(err));
      console.log('Error : %s', color(err, 'red'));
     } else {
      const filterImage = result.filter(a => a.url.endsWith('.jpg') || a.url.endsWith('.png'));
      getBuffer(filterImage[Math.floor(Math.random() * filterImage.length)]?.url).then((buffer) => {
       lolizita.sendMessageButtons(from, '🍪', nameBot, buffer, [{
        buttonId: prefix + command, buttonText: {
         displayText: '[💢] Next >>'
        }, type: 1
       }], {
        quoted: mek
       });
      }, (err) => {
       registreErrs(lolizita, comando, err, sender);
       enviar(mess.commandError(err));
       console.log('Error : %s', color(err, 'red'));
      });
     };
    });
  }
 },
 /* COMANDOS DOWNLOAD */
 {
  keys: ['play',
   'playlist'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(`❌ Erro! Comando correto: ${prefix + comando} < Nome da Música >`);
   enviar('Procurando resultado! ⏳');
   yts(text).then(({
    all
   }) => {
    const m = all.filter((id) => id.type === 'video');
    const array = [];
    for (let i of m) array.push({
     tilte: i.length, title: `➡️ Nome: ${i.title}`, rowId: `${prefix}playupload ${i.title}`, description: `Tempo: ${i.timestamp}\nViews: ${i.views}\nCriador: ${i.author.name}\nLink: ${i.url}`
    });
    lolizita.sendMessage(from, {
     text: `✓ Titulo: ${text}\n× Resultados: ${m.length}\n\nAperte no botão abaixo e procure sua música específica!`, footer: `\n${mess.timeOnline(runtime, process)}`, title: "", buttonText: "Ler mais...", sections: [{
      rows: array
     }]}, {
     quoted: mek
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log("Error : %s", color(err, "red"));
    });
  }
 },
 {
  keys: ['playupload'],
  execution: async function() {
   addFilter(from);
   const text = args.join(' ');
   if (text.length < 1) return enviar(`❌ Erro! Comando correto: ${prefix + comando} < Nome do Áudio >`);
   enviar('🔍 Aguarde... 🔎');
   yts(text).then(({
    all
   }) => {
    const m = all.find((obj) => (obj.type === 'video' && obj.title === text));
    lolizita.templateImageMessage(from, mess.playScraper(m), mess.messageButton(), {
     image: {
      url: m.image
     }}, [{
      quickReplyButton: {
       displayText: `🎶 [ Audio ]`, id: `${prefix}tocar ${text}`
      }}, {
      quickReplyButton: {
       displayText: `🎦 [ Video ]`, id: `${prefix}playvid ${text}`
      }}]);
   }, (err) => {
    enviar(mess.commandError(err));
    console.log("Error : %s", color(err, "red"));
   });
  }
 },
 {
  keys: ['tocar'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(`❌ Erro! Comando correto: ${prefix + comando} < Nome da Música >`);
   enviar('enviando o áudio... ⏳');
   const youTubeSearch = require('yt-search');
   const {
    all
   } = await youTubeSearch(text);
   const urlYou = all.find(({
    type
   }) => type.endsWith("video"));
   const {
    yta
   } = require('./db/lib/ytmate2');

   const {
    dl_link
   } = await yta(urlYou.url);

   lolizita.sendMessage(from, {
    audio: {
     url: dl_link
    }, mimetype: 'audio/mp4'
   }, {
    quoted: mek
   });
  }
 },
 {
  keys: ['pvideo',
   'playvid',
   'playvideo'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(`❌ Erro! Comando correto: ${prefix + comando} < Nome do Vídeo >`);
   enviar("⏳ Baixando seu video!");
   yts(text).then(({
    all
   }) => {
    var objType = all.find((obj) => (obj.type === 'video' && obj.title === text));
    const {
     ytv
    } = require('./db/lib/ytmate2');
    ytv(objType.url).then((c) => {
     lolizita.sendMessage(from, {
      video: {
       url: c.dl_link
      }, mimetype: 'video/mp4'
     }, {
      quoted: mek
     })
    }, (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log("Error : %s", color(err, "red"));
    });
   }, (err) => {
    registreErrs(lolizita, comando, err, sender);
    enviar(mess.commandError(err));
    console.log("Error : %s", color(err, "red"));
   });
  }
 },
 {
  keys: ['audiomeme',
   'playmeme'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(`❌ Erro! Comando correto: ${prefix + comando} < Nome do Áudio >`);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar('Certíssimo! Procurando áudio.. Espere!');
   fetchJson(`${api}/api/download/audios?text=${text}&apikey=${compreSuaApikey}`).then((anu) => {
    if (anu.status === false && anu.code === 403) return enviar(anu.message || 'Error occurred');
    lolizita.sendMessage(from, {
     audio: {
      url: anu.result.audio
     }, mimetype: 'audio/mp4'
    }, {
     quoted: mek
    }).finally(() => lolizita.sendMessageButtons(from, `*Deseja outro áudio?* 🍪`, "Aperte no next abaixo!", mess.logo(), [{
      buttonId: `${prefix + comando} ${text}`, buttonText: {
       displayText: '💢 Next >>> '
      }, type: 1
     }]));
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log("Error : %s", color(err, "red"));
    });
  }
 },
 {
  keys: ['ytmp3'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (args.length < 1) return enviar(mess.linkSyntax());
   if (!args[0].startsWith("https://youtu.be/") && budy.startsWith("https://youtube.com/")) return enviar(mess.textNotAled());
   enviar("⏳ Baixando sua música, espere!");
   yta(text).then((anu) => {
    lolizita.sendMessage(from, {
     audio: {
      url: anu.dl_link
     }, mimetype: 'audio/mp4'
    }, {
     quoted: mek
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log("Error : %s", color(err, "red"));
    });
  }
 },
 {
  keys: ['ytmp4'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (args.length < 1) return enviar(mess.linkSyntax());
   if (!args[0].startsWith("https://youtu.be/") && budy.startsWith("https://youtube.com/")) return enviar(mess.textNotAled());
   enviar("⏳ Baixando seu vídeo, espere!");
   ytv(text).then((anu) => {
    lolizita.sendMessage(from, {
     video: {
      url: anu.dl_link
     }, mimetype: 'video/mp4'
    }, {
     quoted: mek
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log("Error : %s", color(err, "red"));
    });
  }
 },
 {
  keys: ['xnxxplay'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(mess.linkSyntax());
   if (!text.startsWith("https://www.xnxx.com/")) return enviar(mess.textNotAled());
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar("*Baixando porno.. Espere um momento!!* ⏳");
   fetchJson(`${api}/api/download/xnxx/?link=${text}&apikey=${compreSuaApikey}`).then(anu => {
    lolizita.sendMessage(from, {
     video: {
      url: anu.resultado.link
     }, mimetype: 'video/mp4'
    }, {
     quoted: mek
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log("Error : %s", color(err, "red"));
    });
  }
 },
 {
  keys: ['xvideosplay'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(mess.linkSyntax());
   if (!text.startsWith("https://www.xvideos.com/")) return enviar('Erro! Só é permitido links do xvideos.');
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar("*Baixando porno.. Espere um momento!!* ⏳");
   fetchJson(`${api}/api/download/xvideos?link=${text}&apikey=${compreSuaApikey}`).then(anu => {
    lolizita.sendMessage(from, {
     video: {
      url: anu.resultado.link
     }, mimetype: 'video/mp4'
    }, {
     quoted: mek
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log("Error : %s", color(err, "red"));
    });
  }
 },
 {
  keys: ['twitter'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(mess.linkSyntax());
   if (!args[0].startsWith("https://twitter.com/")) return enviar(mess.textNotAled());
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar("*Baixando! Espere alguns segundos..* ⏳");
   fetchJson(`${api}/api/download/twitter/?link=${text}&apikey=${compreSuaApikey}`).then(({
    resultado
   }) => {
    lolizita.sendMessage(from, {
     image: {
      url: resultado.thumb
     }, caption: resultado.desc
    }, {
     quoted: mek
    });
    lolizita.sendMessage(from, {
     video: {
      url: resultado.HD
     }, caption: "Vídeo em HD", mimetype: 'video/mp4'
    }, {
     quoted: mek
    });
    lolizita.sendMessage(from, {
     video: {
      url: resultado.SD
     }, caption: "Vídeo em SD", mimetype: 'video/mp4'
    }, {
     quoted: mek
    });
   }, (err) => {
    registreErrs(lolizita, comando, err, sender);
    enviar(mess.commandError());
    console.log('Error : %s', color(err, 'red'));
   });
  }
 },
 /* COMANDOS CONSULTAS */
 {
  keys: ['gcpf'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar('✓ Gerando cpf, espere!');
   fetchJson(`${api}/api/gerador/cpf?apikey=${compreSuaApikey}`).then((anu) => {
    if (anu.status === false || anu.code === 403) return enviar(anu.message);
    if (anu.status === true || anu.code === 200) lolizita.templateTextMessage(from, mess.generatorCpf(anu), mess.typeMessageConsulta(pushname, nameOwner), [{
     index: 1, urlButton: {
      displayText: "Copiar", url: 'https://www.whatsapp.com/otp/copy/' + mess.generatorCpf(anu)}}]);
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError());
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['gbank'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   enviar('✓ Gerando banco, Espere!');
   fetchJson(api + "/api/gerador/banco?apikey=" + compreSuaApikey).then((anu) => {
    if (anu.status === false || anu.code === 403) return enviar(anu.message);
    if (anu.status === true || anu.code === 200) lolizita.templateTextMessage(from, mess.generatorBanco(anu), mess.typeMessageConsulta(pushname, nameOwner), [{
     index: 1, urlButton: {
      displayText: "Copiar", url: 'https://www.whatsapp.com/otp/copy/' + mess.generatorBanco(anu)}}]);
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError());
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['gcnpj'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar('✓ Gerando cpf, espere!');
   fetchJson(`${api}/api/gerador/cpf?apikey=${compreSuaApikey}`).then((anu) => {
    if (anu.status === false || anu.code === 403) return enviar(anu.message);
    if (anu.status === true || anu.code === 200) lolizita.templateTextMessage(from, mess.generatorCpf(anu), mess.typeMessageConsulta(pushname, nameOwner), [{
     index: 1, urlButton: {
      displayText: "Copiar", url: 'https://www.whatsapp.com/otp/copy/' + mess.generatorCpf(anu)}}]);
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError());
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['ip'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (!text) return enviar(`*Erro! Coloque o endereço do ip!!* ❌`);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar('✓ Fazendo consulta, espere!');
   fetchJson(`${api}/api/consulta/ip?code=${text}&apikey=${compreSuaApikey}`).then((anu) => {
    if (anu.status === false || anu.code === 403) return enviar(anu.message);
    if (anu.status === true || anu.code === 200) lolizita.templateTextMessage(from, mess.queryIp(anu), mess.typeMessageConsulta(pushname, nameOwner), [{
     index: 1, urlButton: {
      displayText: "Copiar", url: 'https://www.whatsapp.com/otp/copy/' + mess.queryIp(anu)}}]);
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError());
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['cep'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (!text) return enviar(`*❌ Erro! Esse comando consulta dados sobre um cep desejado! consulte algum cep assim:*\n\n➡️ ${prefix + comando} [ Cep ]\n⚠️ Exemplo: ${prefix + comando} 68459-604`);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar('✓ Fazendo consulta.. Espere!');
   fetchJson(`${api}/api/consulta/cep?code=${text}&apikey=${compreSuaApikey}`).then((anu) => {
    if (anu.status === false) return enviar(anu.message);
    if (anu.status === true || anu.code === 200) {
     lolizita.templateTextMessage(from, mess.cepConsultation(anu), mess.typeMessageConsulta(pushname, nameOwner), [{
      index: 1, urlButton: {
       displayText: "Copiar", url: 'https://www.whatsapp.com/otp/copy/' + mess.cepConsultation(anu)}}]).finally(() => lolizita.sendMessage(from, {
      location: {
       degreesLatitude: anu.result.latitude, degreesLongitude: anu.result.longitude
      }}));
    } else {
     enviar('*Error Occurred* ❌');
    };
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar('❌ Não achei dados sobre esse cep!');
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['ddd'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(mess.ddd(prefix, comando));
   if (isNaN(text)) return enviar("❌ Erro! Proibido letras.");
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar("*Fazendo consulta... Espere por favor!* ⏳");
   fetchJson(`${api}/api/consulta/ddd?code=${text}&apikey=${compreSuaApikey}`).then(({
    resultado
   }) => {
    lolizita.templateTextMessage(from, mess.messageDdd(resultado), mess.typeMessageConsulta(pushname, nameOwner), [{
     index: 1, urlButton: {
      displayText: "Copiar", url: 'https://www.whatsapp.com/otp/copy/' + mess.messageDdd(resultado)}}]);
   }, (err) => {
    registreErrs(lolizita, comando, err, sender);
    enviar(String(err) === "TypeError: Cannot read properties of undefined (reading 'join')" ? "❌ Erro! Sem resultados desse ddd.": String(err));
   });
  }
 },
 {
  keys: ['banco'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (!text) return enviar(`❌ Erro! Use assim:\n\n➡️ ${prefix + comando} 260`);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar('✓ Fazendo consulta, espere!');
   fetchJson(`${api}/api/consulta/banco?code=${text}&apikey=${compreSuaApikey}`).then((anu) => {
    if (anu.status === false || anu.code === 403) return enviar(anu.message);
    if (anu.status === true || anu.code === 200)
     lolizita.templateTextMessage(from, mess.generatorBanco(anu), mess.typeMessageConsulta(pushname, nameOwner), [{
     index: 1, urlButton: {
      displayText: "Copiar", url: 'https://www.whatsapp.com/otp/copy/' + mess.generatorBanco(anu)}}]);
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['pesquisas', 'pesquisa'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   lolizita.sendExternalAdReply(from,
    `𒄬 Seu cash total: ${getCash(sender)}`,
    linguagem.search(prefix, hr, me),
    `Olá ${pushname}!`,
    archive.mess.value.mess.logo(),
    [{
     buttonId: `${prefix}menu`,
     buttonText: {
      displayText: `💢 [ MENU ] +`
     },
     type: 1
    },
     {
      buttonId: `${prefix}figurinhas`,
      buttonText: {
       displayText: `📲 [ FIGURINHAS ] +`
      },
      type: 1
     }],
    {
     quoted: mek
    });
  }
 },
 {
  keys: ['live'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (text.length < 1) return enviar("❌ Pesquise títulos de live do youtube.");
   enviar("✔️ Espere... Pesquisando live no youtube.");
   yts(text).then((anu) => {
    teks = `No momento existe ${anu.live.length} lives online.\n\n`
    for (let m of anu.live) teks += `➡️ Tipo: *${m.type}*\n✅ Nome: *${m.title}*\n✅ Link: *${m.url}*\n✅ Autor: *${m.author.name}*\n✅ Canal: *${m.author.url}*\n✅ Descrição: *${m.description}*\n\n`;
    lolizita.sendMessage(from, {
     image: {
      url: anu.live[0].image
     }, caption: teks
    }, {
     quoted: mek
    });
   },
    (err) => {
     const error = String(err);
     registreErrs(lolizita, comando, err, sender);
     console.log("Err: %s", color(err, "red"));
     enviar(error.includes("TypeError: Cannot read properties of undefined (reading 'image')") ? "No momento não existe live ao vivo.": "*Comando com falhas!* ❌")
    });
  }
 },
 {
  keys: ['uptodown'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(`❌ Erro! Comando correto: ${prefix + comando} < Nome do Aplicativo >`);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar('Certo! Buscando aplicativo.. espere um momento!!!');
   fetchJson(`${api}/api/uptodown/pesquisa?nome=${text}&apikey=${compreSuaApikey}`).then((anu) => {
    if (anu.status === false) return enviar('Error occurred');
    teks = "";
    for (const item of anu.result) teks += `✓ *🏷️Nome:* ${item.nome}\n× *🈹 Descrição:* ${item.desc}\n× *🔗Link:* ${item.link}\n\n`;
    lolizita.sendMessage(from, {
     image: mess.logo(), caption: teks
    }, {
     quoted: mek
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['hentaistube'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   const text = args.join(' ');
   if (text.length < 1) return enviar(`❌ Erro! Comando correto: ${prefix + comando} < Nome do Hentai >`);
   if (await checkApikey() == "offline") return enviar("*Falha!! Comando com erro.* ⚠️");
   enviar('Opaaa! Espere.. Fazendo pesquisa!');
   fetchJson(`${api}/api/hentaisTube/pesquisa?nome=${text}&apikey=${compreSuaApikey}`).then((anu) => {
    if (anu.status != true && anu.code != 200) return enviar(anu.message || 'Error occurred');
    teks = "";
    for (const item of anu.resultado) teks += `✓ *🏷️Nome:* ${item.nome}\n× *🔗Link:* ${item.link}\n\n`;
    lolizita.sendMessage(from, {
     image: {
      url: anu.resultado[0].image
     }, caption: teks
    }, {
     quoted: mek
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 /* COMANDOS FIGURINHAS */
 {
  keys: ['f',
   's',
   'fig',
   'gif',
   'figura',
   'figu',
   'figurinha',
   'stikergif',
   'stickergif',
   'sticker',
   'stiker'
  ],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender,
    10);
   var {
    addExif,
    getExif
   } = require('./db/lib/idExif');
   if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
    buffer = await lolizita.downloadAndSaveMediaMessage(mek.message[type].contextInfo?.quotedMessage?.imageMessage || mek.message?.imageMessage || mek.message[type].contextInfo?.quotedMessage?.buttonsMessage.imageMessage);
    let ran = getRandom('.webp');
    execute(`ffmpeg -i ${buffer} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${ran}`, async function(err, result) {
     await addExif(`./${ran}`, {
      packname: pushname, author: groupName
     });
     lolizita.sendMessage(from, {
      sticker: fs.readFileSync(`./${ran}`)}, {
      quoted: mek
     }).finally(() => fs.unlinkSync(`./${ran}`));
    });
   } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
    enviar('✅ Espere! A criação de figurinhas com vídeos e/ou Gif, pode demorar um pouco. ⏳\n\n❌ Caso a figurinha animada não seja recebida dentro de 3 minutos.. Use o comando novamente!');
    let ran = getRandom('.webp');
    buffer = await lolizita.downloadAndSaveMediaMessage(mek.message[type].contextInfo?.quotedMessage?.videoMessage || mek.message?.videoMessage || mek.message[type].contextInfo?.quotedMessage?.buttonsMessage.videoMessage);
    execute(`ffmpeg -i ${buffer} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${ran}`, async function(err, res) {
     await addExif(`./${ran}`, {
      packname: pushname, author: groupName
     });
     lolizita.sendMessage(from, {
      sticker: {
       url: `./${ran}`
      }}, {
      quoted: mek
     }).finally(() => fs.unlinkSync(`./${ran}`));
    });
   } else {
    enviar(mess.marking(prefix, comando));
   };
  }
 },
 {
  keys: ['stickertake'],
  execution: async function () {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const teks = body.slice(12);
   var {
    addExif,
    getExif
   } = require('./db/lib/idExif');
   if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
    buffer = await lolizita.downloadAndSaveMediaMessage(mek.message[type].contextInfo?.quotedMessage?.imageMessage || mek.message?.imageMessage);
    let ran = getRandom('.webp');
    execute(`ffmpeg -i ${buffer} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 800:800 ${ran}`, async function(err, result) {
     await addExif(`./${ran}`, {
      packname: teks.split('|')[0], author: teks.split('|')[1]
     });
     lolizita.sendMessage(from, {
      sticker: fs.readFileSync(`./${ran}`)}, {
      quoted: mek
     }).finally(() => fs.unlinkSync(`./${ran}`));
    });
   } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
    enviar('✅ Espere! A criação de figurinhas com vídeos e/ou Gif, pode demorar um pouco. ⏳\n\n❌ Caso a figurinha animada não seja recebida dentro de 3 minutos.. Use o comando novamente!');
    let ran = getRandom('.webp');
    buffer = await lolizita.downloadAndSaveMediaMessage(mek.message[type].contextInfo?.quotedMessage?.videoMessage || mek.message?.videoMessage);
    execute(`ffmpeg -i ${buffer} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=12,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${ran}`, async function(err, res) {
     await addExif(`./${ran}`, {
      packname: teks.split('|')[0], author: teks.split('|')[1]
     });
     lolizita.sendMessage(from, {
      sticker: {
       url: `./${ran}`
      }}, {
      quoted: mek
     }).finally(() => fs.unlinkSync(`./${ran}`));
    });
   } else {
    enviar(mess.marking(prefix, comando));
   };
  }
 },
 {
  keys: ['attp',
   'attp1',
   'attp2',
   'attp3',
   'attp4',
   'attp5',
   'attp6'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ')
   if (text.length < 1) return enviar("*Uso incorreto! Cadê o texto? ... * ❌");
   if (command.toLowerCase() == "attp") {
    getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(text)}`).then((buff) => {
     enviar(buff, 'sticker');
    },
     (err) => {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError(err));
      console.log('Error : %s', color(err, 'red'));
     });
   } else {
    getBuffer(`https://api.brizaloka-api.tk/ttp/${command}?apikey=brizaloka&text=${encodeURIComponent(text)}`).then((buff) => {
     enviar(buff, 'sticker');
    },
     (err) => {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError(err));
      console.log('Error : %s', color(err, 'red'));
     });
   };
  }
 },
 {
  keys: ['togif',
   'toimg'],
  execution: async function() {
   addFilter(from)
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (!isQuotedSticker) return enviar(`Use ${prefix + comando} em um sticker`)
   const typeStickerToimg = mek.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage;
   if (typeStickerToimg.isAnimated === true) {
    lolizita.downloadAndSaveMediaMessage(typeStickerToimg, 'sticker').then((obj) => {
     togif(obj).then((buffer) => {
      if (buffer.status === false) {
       enviar('Error occurred');
      } else if (buffer.status === true) {
       enviar('⏳ Transformando sticker para gif..');
       lolizita.sendMessage(from, {
        video: {
         url: buffer.result
        }, gifPlayback: true, caption: '✅'
       }, {
        quoted: mek
       }).finally(() => fs.unlinkSync(obj));
      };
     },
      (err) => {
       registreErrs(lolizita, comando, err, sender);
       enviar(mess.commandError(err));
       console.log('Error : %s', color(err, 'red'));
      });
    },
     (err) => {
      registreErrs(lolizita,
       comando,
       err,
       sender);
      enviar(mess.commandError(err));
      console.log('Error : %s',
       color(err, 'red'));
     });
   } else if (typeStickerToimg.isAnimated === false) {
    enviar('⏳ Transformando sticker para foto..');
    lolizita.downloadMediaMessage(typeStickerToimg).then((value) => {
     lolizita.sendMessage(from, {
      image: value, caption: '✅'
     }, {
      quoted: mek
     });
    },
     (err) => {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError(err));
      console.log('Error : %s', color(err, 'red'));
     });
   };
  }
 },
 {
  keys: ['tourl'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   if (!isQuotedImage) return enviar('❌ É necessário que marque uma foto!');
   enviar('⏳ Espere, processando comando! ⏳');
   lolizita.downloadAndSaveMediaMessage(mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage).then((anu) => {
    let {
     telegraph
    } = require('./db/lib/uploader.js');
    telegraph(anu).then((buffer) => {
     enviar(buffer)
    },
     (err) => {
      registreErrs(lolizita, comando, err, sender);
      enviar(mess.commandError(err));
      console.log('Error : %s', color(err, 'red'));
     });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['emojimix'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (!text) return enviar(`❌ Erro! O uso do emojimix deve conter dois emojis com um + entre eles:\n\n✔️ Exemplo sem emojis:\n\n⚠️ ${prefix + comando} [ Emoji ] + [ Emoji ]\n⚠️ ${prefix + comando} 😔+😍`);
   if (!text.includes("+")) return enviar(`❌ Erro! O uso do emojimix deve conter dois emojis com um + entre eles:\n\n✔️ Exemplo sem emojis:\n\n⚠️ ${prefix + comando} [ Emoji ] + [ Emoji ]\n⚠️ ${prefix + comando} 😔+😍`);
   enviar('✓ Espere.. Fazendo emoji!');
   const sey = getRandom('.webp');
   fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${text.split('+')[0]}_${text.split('+')[1]}`).then((anu) => {
    execute(`ffmpeg -i ${anu.results[0].url} -vf scale=512:512 ${sey}`, async function(err, result) {
     lolizita.sendMessage(from, {
      sticker: {
       url: `./${sey}`
      }}, {
      quoted: mek
     }).finally(() => fs.unlinkSync(sey));
    });
   },
    (err) => {
     registreErrs(lolizita, comando, err, sender);
     enviar(mess.commandError(err));
     console.log('Error : %s', color(err, 'red'));
    });
  }
 },
 {
  keys: ['take',
   'rename'],
  execution: async function() {
   addFilter(from);
   if (getCashNumber(sender) < 10) return enviar(mess.lessCash(getCashNumber, sender));
   removeCash(sender, 10);
   const text = args.join(' ');
   if (!isQuotedSticker) return enviar('Marque uma figurinha! ❌');
   if (text.length < 1) return enviar(`*Cadê o nome da Figurinha e o Nome do Autor?* ⚠️\n\n >> ${prefix + comando} Nome dá Figurinha|Nome do Autor`);
   if (!text.split('|')[0]) return enviar(`*Erro! Sintaxe correta: ${text.split('|')[0] || "Nome"}|${text.split('|')[1] || "Autor"}* ❌\n\n⚠️ Falta por o Nome da Figurinha! Veja acima o exemplo, uso do | é necessário.`);
   if (!text.split('|')[1]) return enviar(`*Erro! Sintaxe correta: ${text.split('|')[0] || "Nome"}|${text.split('|')[1] || "Autor"}* ❌\n\n⚠️ Falta por o Nome do *Autor!* Veja acima o exemplo, uso do | é necessário.`);
   if (text.split('|')[0].length > 15) return enviar("*Nome dá figurinha muito grande! Só pode menos que 15 letras.* ❌");
   if (text.split('|')[1].length > 15) return enviar("*Nome do Autor muito grande! Só pode menos que 15 letras.* ❌");
   var {
    addExif,
    getExif
   } = require('./db/lib/idExif');
   buffer = await lolizita.downloadAndSaveMediaMessage(mek.message[type].contextInfo?.quotedMessage.stickerMessage);
   await addExif(buffer, {
    packname: text.split("|")[0], author: text.split("|")[1]});
   lolizita.sendMessage(from, {
    sticker: fs.readFileSync(buffer)}, {
    quoted: mek
   }).finally(() => fs.unlinkSync(buffer));
  }
 },
];

const cmd = cmdBase.find((cmd) => cmd.keys.includes(command));

cmd?.execution().then(() => {},
 (err) => {
  console.log(color('[ CMDBASE ]', 'red'),
   color(__filename),
   err);
 });

if (budy.toLowerCase() == 'prefix') {
 enviar(`O meu prefixo nesse grupo é ${prefix}`);
}

} catch (error) {
const err = String(error);
if (err.includes('Error: rate-overlimit')) return;
lolizita.sendMessage(owner[0],
 {
  text: require('util').inspect(error)});
console.log(color('[ ERROR ] ', 'red'), color(__filename),
 err);
};
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
let {
bannerText
} = require('./db/lib/banner');
console.log(bannerText(`Update file: ${__filename}`).string);
delete require.cache[file];
require(file);
});