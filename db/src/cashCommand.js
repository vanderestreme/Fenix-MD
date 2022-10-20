const fs = require('fs');
const util = require('util');
const moment = require('moment-timezone');
const execute = util.promisify(require('child_process').exec);

const {
 color
} = require('../lib/color');

const {
 owner,
 compreSuaApikey,
 api
} = require('../../configure aqui.js');

module.exports = lolizita = async (lolizita, mek, archive) => {
 try {
  const from = mek.key.remoteJid;
  const content = JSON.stringify(mek.message);
  const type = Object.keys(mek.message).find((key) => !['senderKeyDistributionMessage', 'messageContextInfo'].includes(key));
  const prefix = archive.changePrefix.value.find((obj) => obj.groupId === from)?.prefix || '/';

  /* VISUALIZA STATUS*/
  if (mek.key.remoteJid == 'status@broadcast') return lolizita.readMessages([mek.key]);

  const budy = (type === 'conversation') ? mek.message.conversation: (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text: ''
  const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation: (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption: (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption: (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text: (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ? mek.message[type].singleSelectReply.selectedRowId: (type == 'lolizita.sendMessageButtonMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId: (type == 'stickerMessage') && ((mek.message[type].fileSha256.toString('base64')) !== null && (mek.message[type].fileSha256.toString('base64')) !== undefined) ? (mek.message[type].fileSha256.toString('base64')): "" || mek.message[type]?.selectedButtonId || ""

  /* COMMANDS */
  const command = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase(): '';
  const comando = body.slice(1).trim().split(/ +/).shift().toLowerCase();
  const isCmd = body.startsWith(prefix);
  const args = body.trim().split(/ +/).slice(1);

  /* INFO BOT */
  const me = lolizita.user;
  const nameBot = lolizita.user?.name || "-";
  const botNumber = lolizita.user.id.split(':')[0] + '@s.whatsapp.net';

  /* GROUP META DADOS */
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

  /* FUNCTION GET */
  // Funções get
  const getPushName = (id) => archive._pushNames.value.find((obj) => obj.id === id)?.pushName;
  const getRecado = (id) => lolizita.fetchStatus(id);
  const getMessagePrivado = (userId) => archive._messageCount.value.users.find(obj => obj.id === userId)?.total || 0;
  const getTotalMessageGroup = (userId, groupId) => archive._messageCount.value.groups.find(obj => obj.groupId === groupId)?.users[userId] || 0;
  const getGroupMessageTotal = (group) => archive._messageCount.value?.groups.find((obj) => obj.groupId === group)?.total || 0;

  /* COUNT MESSAGE */
  const getInfoMessage = isGroup ? archive._messageCount.value.groups.find((obj) => obj.groupId === from): [];
  const idMembers = isGroup ? Object.keys(getInfoMessage.users): [];
  const messageMembers = isGroup ? Object.values(getInfoMessage.users): [];
  const membersId = isGroup ? groupMembers.map(({
   id
  }) => id): [];
  const ghosts = isGroup ? membersId.filter(id => !getTotalMessageGroup(id, from) && botNumber !== id): [];

  /* HR | HORA */
  const hr = moment.tz('America/Sao_Paulo').format('HH:mm:ss');

  /* OWNER PUSHNAME*/
  const {
   owner,
   compreSuaApikey,
   api
  } = require('../../configure aqui.js');

  const isOwner = owner.includes(sender);
  const nameOwner = archive._pushNames.value.find(v => v.id === owner[0])?.pushName;
  const pushname = mek.pushName || "-";

  /* TRUE OF FALSE */
  const isWelcome = isGroup ? archive.welcome.value.includes(from): true
  const isAntiLink = isGroup ? archive.antilink.value.includes(from): true
  const isViewOnce = isGroup ? archive.antiViewOnce.value.includes(from): true
  const isAntiFake = isGroup ? archive.antifake.value.includes(from): true
  const isListaNegra = isGroup ? archive.antiListaNegra.value.includes(from): true;
  const isSimih = isGroup ? archive._simih.value.includes(from): false;

  const {
   linguagem,
   mess
  } = require('../database/menu');

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
   reacting
  } = require('../lib/_ModuFunctions');

  const {
   isFiltered,
   addFilter
  } = require('../lib/antiflood.js');

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
  } = require('../lib/functions');

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

  const reply = (caption) => {
   lolizita.sendMessage(from, {
    text: util.inspect(caption)
   }, {
    quoted: mek
   });
  }

  /* TYPES MESSAGE */
  const isMedia = (type === 'imageMessage' || type === 'videoMessage')
  const isQuotedMsg = (type == 'extendedTextMessage')
  const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true: false: false
  const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true: false: false
  const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true: false: false

  const cmdBase = [{
   keys: ['cash'],
   execution: async function () {
    const mId = (mek.message[type].contextInfo?.mentionedJid?.[0] || mek.message[type].contextInfo?.participant || sender).replace(/:\d*?(?=@)/g, '');
    enviar(`*Total cash:* ${getCash(mId) === "und.efi.ned" ? 0: getCash(mId)}`);
   }
  },
   {
    keys: ['usercash'],
    execution: async function() {
     const text = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
     if (mentionedJid == "@s.whatsapp.net" && !mek.message[type].contextInfo?.participant) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
     if (mentionedJid !== "@s.whatsapp.net") mentions(`Saldo de cash do @${mentionedJid.split('@')[0]}* 💰\n~ Cash total: ${getCash(mentionedJid)}`, mentionedJid, true);
     else {
      const mentionedJid = mek.message[type].contextInfo.participant;
      enviar(getCash(mentionedJid));
     };
    }
   },
   {
    keys: ['transferir'],
    execution: async function() {
     try {
      const text = body.slice(11);
      const mentions = text.replace(/[- +@)(]/g,
       '');
      const mentionedJid = mentions.split('|')[0] + "@s.whatsapp.net";
      if (!isGroup) return enviar(mess.group());
      if (isNaN(mentions.includes('|') ? mentions.split('|')[1]: mentions)) return enviar("*Sua quantia de cash não pode ser em letras!!!*❌");
      if (Number(mentions.split('|')[1]) > 5000) return enviar("*Erro! Valor máximo para fazer transferências é 5000* ❌");
      if (Number(mentions.includes('|') ? mentions.split('|')[1] > getCashNumber(sender): mentions > getCashNumber(sender))) return enviar(`*Você não tem ${cashGet(mentions.includes('|') ? mentions.split('|')[1]: mentions)} de cash's para fazer essa transferência!* ❌\n\nSua quantia de cash's: ${cashGet(getCashNumber(sender))}`);
      if (mentionedJid == "@s.whatsapp.net" && !mek.message[type].contextInfo?.participant) return enviar('marca alguem pucta')
      if ((mentionedJid == "@s.whatsapp.net" && !mentions.split('|')[0]) || (mentionedJid !== "@s.whatsapp.net" && !mentions.split('|')[0])) return enviar('diz a quantia pucta')
      enviar('Fazendo transferência..');
      if (mentionedJid !== mentions + "@s.whatsapp.net") {
       reacting('✅', lolizita, mek);
       donateCash(sender, mentionedJid, mentions.split('|')[1], enviar, lolizita, mek, from, prefix);
      } else {
       const mentionedMessage = mek.message[type].contextInfo.participant;
       donateCash(sender, mentionedMessage, mentions, enviar, lolizita, mek, from, prefix);
      }
     } catch (err) {
      console.log(err);
     };
    }
   },
   {
    keys: ['roubar'],
    execution: async function() {
     const text = args.join(' ');
     const mentionedJid = mek.message[type]?.contextInfo?.participant || text.replace(/[- +@)(]/g,
      '') + "@s.whatsapp.net";
     if (mentionedJid.length < 16) return enviar("*Marque a mensagem do membro ou o número com o comando!* ❌");
     if (text.includes(mentionedJid)) return enviar("*Não é permitido mencionar você próprio!* ❌");
     if (mentionedJid.includes(botNumber)) return enviar("*Não é permitido marcar minhas mensagens! Marque outro participante.* ❌");
     await stealCash(mentionedJid, 14, from, mek, lolizita);
    }
   },
   {
    keys: ['rankcash'],
    execution: async function() {
     const groupCashMembers = archive.cash.value.filter(x => groupMembers.map(i => i.id).includes(x.userId));

     text = '';
     for (const item of groupCashMembers) text += `[📲] × *@${item.userId.split('@')[0]}*\n[] *Nome:* ${item.pushName}\n[] *Cash:* ${item.cash}\n\n`;
     mentions(text, archive.cash.value.filter(x => groupMembers.map(i => i.id).includes(x.userId)).map(isMembers => isMembers.userId), false);
    }
   },
   {
    keys: ['loja'],
    execution: async function() {
     lolizita.sendMessage(from,
      {
       document: mess.logo(),
       fileLength: 10000,
       description: 'pica',
       fileName: nameBot,
       mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
       contextInfo: {
        externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: false,
         showAdAttribution: true,
         sourceUrl: 'https://youtube.com',
         mediaUrl: 'https://youtube.com',
         title: lolizita.user?.name || "-",
         thumbnail: mess.logo()
        }
       }
      });
    }
   }];

  const cmd = cmdBase.find((cmd) => cmd.keys.includes(command));

  cmd?.execution().then(() => {},
   (err) => {
    console.log(color('[ CMDBASE ]', 'red'), color(__filename),
     err);
   });

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
 console.log(color(`Update file: ${__filename}`, 'red'));
 delete require.cache[file];
 require(file);
});