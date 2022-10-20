const fs = require('fs');
const util = require('util');
const moment = require('moment-timezone');
const execute = util.promisify(require('child_process').exec);

const {
 color
} = require('../lib/color');

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
  const groupMetadata = isGroup ? await lolizita.groupMetadata(from): '';
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
   getCash,
   donateCash,
   getCashNumber,
   addAfk,
   getAfk,
   removeCash,
   addCash,
   cashGet
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

  //if (getCashNumber(sender) < 10 && isCmd) return enviar(`❌ *Seu cash é insuficiente!*\n\nO preço é de 10 cash por comando! Você tem: ${getCashNumber(sender)} cash.`);

  const cmdBase = [{
   keys: ['status'],
   execution: async function() {
    lolizita.sendExternalAdReply(from, `𒄬 Seu cash total: ${getCash(sender)}`, linguagem.groupStatus(getGroupMessageTotal, from, participants, ghosts, idMembers, isAntiLink, isWelcome, isViewOnce, isAntiFake, isSimih), `Olá ${pushname}!`, archive.mess.value.mess.logo(), [{
     buttonId: `${prefix}menu`, buttonText: {
      displayText: `💢 [ MENU ] +`
     }, type: 1
    }, {
     buttonId: `${prefix}status`, buttonText: {
      displayText: `📳 [ STATUS ] +`
     }, type: 1
    }], {
     quoted: mek
    });
   }
  },
   {
    keys: ['banir',
     'ban',
     'remover',
     'remove',
     'kick'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isGroup) return enviar(mess.group());
      if (!isGroupAdmins) return enviar(mess.admin());
      if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      const value = participants.findIndex(({
       id
      }) => id === mentionedJid);
      if (value === -1) return enviar('*Esse membro não está nesse grupo!* ❌');
      if (mentionedJid.includes(owner[0])) return enviar("❌ Erro! Não posso banir meu dono.");
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      lolizita.groupParticipantsUpdate(from, [mentionedJid], "remove");
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     }
    }
   },
   {
    keys: ['promote',
     'promover'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isGroup) return enviar(mess.group());
      if (!isGroupAdmins) return enviar(mess.admin());
      if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo?.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      const value = participants.findIndex(({
       id
      }) => id === mentionedJid);
      if (value === -1) return enviar("*Esse Membro não faz mais parte desse grupo!* ❌");
      const position = participants.findIndex((x) => (x.id === mentionedJid && x.admin === "admin"));
      if (position !== -1) return enviar('*Esse membro já está como administrador desse grupo* ❌');
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      response = await lolizita.groupParticipantsUpdate(from, [mentionedJid], "promote");
      mentions(`✔️ Sucesso! Membro: @${mentionedJid.split('@')[0]} promovido.`, [mentionedJid], true);
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     };
    }
   },
   {
    keys: ['add',
     'reviver',
     'adicionar'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isGroup) return enviar(mess.group());
      if (!isGroupAdmins) return enviar(mess.admin());
      if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      response = await lolizita.groupParticipantsUpdate(from, [mentionedJid], "add");
      if (response[0].status === '409') return enviar("[ ❌ ] ... Esse membro já está no grupo");
      if (response[0].status === '403') return enviar("[ ❌ ] ... Não foi possível adicionar ao grupo!");
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     };
    }
   },
   {
    keys: ['demote',
     'rebaixar'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isGroup) return enviar(mess.group());
      if (!isGroupAdmins) return enviar(mess.admin());
      if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      const value = participants.findIndex(({
       id
      }) => id === mentionedJid);
      if (value === -1) return enviar("*Esse Membro não faz mais parte desse grupo!* ❌");
      const position = participants.findIndex((x) => (x.id === mentionedJid && x.admin === null));
      if (position !== -1) return enviar('*Esse membro já está rebaixado desse grupo* ❌');
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      lolizita.groupParticipantsUpdate(from, [mentionedJid], "demote");
      mentions(`✔️ Sucesso! Membro: @${mentionedJid.split('@')[0]} rebaixado.`, [mentionedJid], true);
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     };
    }
   },
   {
    keys: ['abrir'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (groupMetadata.announce == false) return enviar('*Esse grupo já está aberto!* ❌');
     lolizita.groupSettingUpdate(from, 'not_announcement');
    }
   },
   {
    keys: ['fechar'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (groupMetadata.announce == true) return enviar('*Esse grupo já está fechado!* ❌');
     lolizita.groupSettingUpdate(from, 'announcement');
    }
   },
   {
    keys: ['group'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (args[0] === "abrir") {
      lolizita.groupSettingUpdate(from, 'not_announcement')
     } else if (args[0] === "fechar") {
      lolizita.groupSettingUpdate(from, 'announcement')
     } else {
      lolizita.sendExternalAdReply(from, `𒄬 Seu cash total: ${getCash(sender)}`, "Aperte nas duas opções abaixo.", `Olá ${pushname}!`, mess.logo(), [{
       buttonId: `${prefix}abrir`, buttonText: {
        displayText: `🔓 [ Abrir ] +`
       }, type: 1
      }, {
       buttonId: `${prefix}fechar`, buttonText: {
        displayText: `🔒 [ Fechar ] +`
       }, type: 1
      }], {
       quoted: mek
      });
     }
    }
   },
   {
    keys: ['ativos',
     'atividades'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!getInfoMessage) return enviar('Grupo não registrado!');
     teks = `Total membros: ${idMembers.length}\nTotal mensagens: ${getInfoMessage.total}\n`;
     const participantsIds = participants.map(obj => obj.id);
     const memRange = messageMembers.map((v, i) => i).sort((a, b) => messageMembers[b] - messageMembers[a])
     for (const i of memRange)
      if (participantsIds.includes(idMembers[i])) teks += `\n*× Nome:* ${archive._pushNames.value.find(obj => obj.id === idMembers[i])?.pushName || 'undefinedkkkk'}\n*× Membro:* @${idMembers[i].split('@')[0]}\n*× Total mensagens:* ${messageMembers[i]}\n`;
     mentions(teks, idMembers, false);
    }
   },
   {
    keys: ['inativos',
     'ghosts',
     'ghost'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (ghosts.length === 0) return enviar('❌ Não tem membros ghosts nesse grupo!');
     teks = `Total membros com 0 mensagens: ${ghosts.length}\n\n`;
     for (const item of ghosts) teks += `× @${item.split('@')[0]}\n`;
     mentions(teks, ghosts, false);
    }
   },
   {
    keys: ['banghost',
     'baninativos'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (ghosts.length === 0) return enviar('❌ Não tem membros sem mensagem nesse grupo!');
     let timeBanished = 0;
     for (const stream of ghosts) {
      setTimeout(() => lolizita.groupParticipantsUpdate(from, [stream], "remove"), timeBanished);
      timeBanished += 1000;
     };
    }
   },
   {
    keys: ['notifyghosts'],
    execution: async function() {
     const teks = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (teks.length < 1) return enviar(`❌ Erro! Comando correto: ${prefix + comando} < Texto >`);
     lolizita.sendMessage(from, {
      text: teks, mentions: ghosts
     });
    }
   },
   {
    keys: ['simih',
     'simi'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (args.length < 1) return enviar(mess.notiferr(prefix, comando));
     if (args[0] === 'on') {
      if (isSimih) return enviar(mess.activecommand(comando));
      archive._simih.value.push(from);
      fs.writeFileSync(archive._simih.fileName, JSON.stringify(archive._simih.value));
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     } else if (args[0] === 'off') {
      let position = archive._simih.value.indexOf(archive._simih.value.find((x) => x === from));
      if (position === -1) return enviar(mess.commandDisabled(comando));
      archive._simih.value.splice(position, 1);
      fs.writeFileSync(archive._simih.fileName, JSON.stringify(archive._simih.value));
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     }
    }
   },
   {
    keys: ['antilink',
     'anti-link'],
    execution: async function() {
     addFilter(from);
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (args.length < 1) return enviar(mess.notiferr(prefix, comando));
     if (args[0] === 'on') {
      if (isAntiLink) return enviar(mess.activecommand(comando));
      archive.antilink.value.push(from);
      fs.writeFileSync(archive.antilink.fileName, JSON.stringify(archive.antilink.value))
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     } else if (args[0] === 'off') {
      let position = archive.antilink.value.indexOf(archive.antilink.value.find((x) => x === from))
      if (position === -1) return enviar(mess.commandDisabled(comando));
      archive.antilink.value.splice(position, 1);
      fs.writeFileSync(archive.antilink.fileName, JSON.stringify(archive.antilink.value))
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     }
    }
   },
   {
    keys: ['antifake',
     'anti-fake'],
    execution: async function() {
     addFilter(from);
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (args.length < 1) return enviar(mess.notiferr(prefix, comando));
     if (args[0] === 'on') {
      if (isAntiFake) return enviar(mess.activecommand(comando));
      archive.antifake.value.push(from)
      fs.writeFileSync(archive.antifake.fileName, JSON.stringify(archive.antifake.value))
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     } else if (args[0] === 'off') {
      let position = archive.antifake.value.indexOf(archive.antifake.value.find((x) => x === from))
      if (position === -1) return enviar(mess.commandDisabled(comando));
      archive.antifake.value.splice(position, 1)
      fs.writeFileSync(archive.antifake.fileName, JSON.stringify(archive.antifake.value))
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     }}
   },
   {
    keys: ['welcome',
     'bemvindo',
     'bem-vindo'],
    execution: async function() {
     addFilter(from);
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (args.length < 1) return enviar(mess.notiferr(prefix, comando));
     if (args[0] === 'on') {
      if (isWelcome) return enviar('*❌ ... Função welcome já está ativado.');
      archive.welcome.value.push(from);
      fs.writeFileSync(archive.welcome.fileName, JSON.stringify(archive.welcome.value))
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     } else if (args[0] === 'off') {
      let position = archive.welcome.value.indexOf(archive.welcome.value.find((x) => x === from))
      if (position === -1) return enviar(mess.commandDisabled(comando));
      archive.welcome.value.splice(position, 1);
      fs.writeFileSync(archive.welcome.fileName, JSON.stringify(archive.welcome.value))
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     }}
   },
   {
    keys: ['viewonce',
     'anti-viewonce'],
    execution: async function() {
     addFilter(from);
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (args.length < 1) return enviar(mess.notiferr(prefix, comando));
     if (args[0] === 'on') {
      if (isViewOnce) return enviar(mess.activecommand(comando));
      archive.antiViewOnce.value.push(from);
      fs.writeFileSync(archive.antiViewOnce.fileName, JSON.stringify(archive.antiViewOnce.value));
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     } else if (args[0] === 'off') {
      let position = archive.antiViewOnce.value.indexOf(archive.antiViewOnce.value.find((x) => x === from));
      if (position === -1) return enviar(mess.commandDisabled(comando));
      archive.antiViewOnce.value.splice(position, 1)
      fs.writeFileSync(archive.antiViewOnce.fileName, JSON.stringify(archive.antiViewOnce.value));
      lolizita.templateMessage(from, mess.functionOn(comando), [{
       title: "FUNÇÃO ANTILINK (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Link ]", rowId: `${prefix}antilink on`, description: isAntiLink ? 'Anti: Link, está: Ativado ✅': 'Anti: Link, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Link ]", rowId: `${prefix}antilink off`
       }]}, {
       title: "FUNÇÃO ANTIFAKE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Anti: Fake ]", rowId: `${prefix}antifake on`, description: isAntiFake ? 'Anti: fake, está: Ativado ✅': 'Anti: fake, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Anti: Fake ]", rowId: `${prefix}antifake off`
       }]}, {
       title: "FUNÇÃO WELCOME (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Welcome ]", rowId: `${prefix}Welcome on`, description: isWelcome ? 'Welcome, está: Ativado ✅': 'Welcome está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Welcome ]", rowId: `${prefix}Welcome off`
       }]}, {
       title: "FUNÇÃO SIMIH (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* Simih ]", rowId: `${prefix}simih on`, description: isSimih ? 'Simih, está: Ativado ✅': 'Simih está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* Simih ]", rowId: `${prefix}simih off`
       }]}, {
       title: "FUNÇÃO VIEW ONCE (Dois módulos);", rows: [{
        title: "🧧[ *Ligar* View Once ]", rowId: `${prefix}viewonce on`, description: isViewOnce ? 'View Once, está: Ativado ✅': 'View Once, está: Desativado ❌'
       }, {
        title: "🧧[ *Desligar* View Once ]", rowId: `${prefix}viewonce off`
       }]}], {
       quoted: mek
      });
     }
    }
   },
   {
    keys: ['addwelcome'],
    execution: async function() {
     const addMessageWelcome = budy.slice(11);
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (!addMessageWelcome) return lolizita.sendMessageButtons(from, `❌ Forma correta: ${prefix + comando} Bem Vindo #membro`, `Alguma dúvida? Aperte no botão abaixo ou use: ${prefix}welcomehelp`, mess.logo(), [{
      buttonId: prefix + 'welcomehelp', buttonText: {
       displayText: '[💢] Manual/Welcome'
      }, type: 1
     }], {
      quoted: mek
     });
     position = archive.textWell.value.findIndex((obj) => obj.groupId === from);
     if (position !== -1) {
      archive.textWell.value[position].welcomeMessage = addMessageWelcome;
      fs.writeFileSync(archive.textWell.fileName, JSON.stringify(archive.textWell.value, null, 2));
      lolizita.sendMessageButtons(from, `✅ Mensagem de welcome trocada com sucesso!`, `Caso queira remover a sua mensagem personalizada da função bem vindo, é só clicar no botão abaixo!\n\nOu caso você não estiver vendo o botão, use: ${prefix}remwelcome`, mess.logo(), [{
       buttonId: prefix + 'welcomehelp', buttonText: {
        displayText: '[💢] Manual/Welcome'
       }, type: 1
      }, {
       buttonId: prefix + 'remwelcome', buttonText: {
        displayText: '[ ❌ ] Remover welcome/mensagem'
       }, type: 1
      }], {
       quoted: mek
      });
     } else {
      archive.textWell.value.push({
       name: groupName, groupId: from, activated: sender, welcomeMessage: addMessageWelcome, exitMessage: null
      });
      fs.writeFileSync(archive.textWell.fileName, JSON.stringify(archive.textWell.value, null, 2));
      lolizita.sendMessageButtons(from, `✅ Mensagem de: welcome/bem vindo; configurada e salva no banco de dados!`, `Caso queira remover a sua mensagem personalizada da função bem vindo, é só clicar no botão abaixo!\n\nOu caso você não estiver vendo o botão, use: ${prefix}remwelcome`, mess.logo(), [{
       buttonId: prefix + 'welcomehelp', buttonText: {
        displayText: '[💢] Manual/Welcome'
       }, type: 1
      }, {
       buttonId: prefix + 'remwelcome', buttonText: {
        displayText: '[ ❌ ] Remover welcome/mensagem'
       }, type: 1
      }], {
       quoted: mek
      });
     }}
   },
   {
    keys: ['exitwelcome'],
    execution: async function() {
     const exitMessageWelcome = budy.slice(12);
     if (!exitMessageWelcome) return lolizita.sendMessageButtons(from, `❌ Forma correta: ${prefix + comando} Tchau #membro`, `Alguma dúvida? Aperte no botão abaixo ou use: ${prefix}welcomehelp`, mess.logo(), [{
      buttonId: prefix + 'welcomehelp', buttonText: {
       displayText: '[💢] Manual/Welcome'
      }, type: 1
     }], {
      quoted: mek
     });
     position = archive.textWell.value.findIndex((obj) => obj.groupId === from)
     if (position !== -1) {
      archive.textWell.value[position].exitMessage = exitMessageWelcome;
      fs.writeFileSync(archive.textWell.fileName, JSON.stringify(archive.textWell.value, null, 2));
      lolizita.sendMessageButtons(from, `✅ Mensagem de welcome trocada com sucesso!`, `Caso queira remover a sua mensagem personalizada da função bem vindo, é só clicar no botão abaixo!\n\nOu caso você não estiver vendo o botão, use: ${prefix}remwelcome`, mess.logo(), [{
       buttonId: prefix + 'welcomehelp', buttonText: {
        displayText: '[💢] Manual/Welcome'
       }, type: 1
      }, {
       buttonId: prefix + 'remwelcome', buttonText: {
        displayText: '[ ❌ ] Remover welcome/mensagem'
       }, type: 1
      }], {
       quoted: mek
      });
     } else {
      archive.textWell.value.push({
       name: groupName, groupId: from, activated: sender, welcomeMessage: null, exitMessage: exitMessageWelcome
      });
      fs.writeFileSync('./db/FilesJson/textWelcome.json', JSON.stringify(archive.textWell.value, null, 2));
      lolizita.sendMessageButtons(from, `✅ Mensagem de: welcome/Saída; configurada e salva no banco de dados!`, `Caso queira remover a sua mensagem personalizada da função bem vindo, é só clicar no botão abaixo!\n\nOu caso você não estiver vendo o botão, use: ${prefix}remwelcome`, mess.logo(), [{
       buttonId: prefix + 'welcomehelp', buttonText: {
        displayText: '[💢] Manual/Welcome'
       }, type: 1
      }, {
       buttonId: prefix + 'remwelcome', buttonText: {
        displayText: '[ ❌ ] Remover welcome/mensagem'
       }, type: 1
      }], {
       quoted: mek
      });
     }
    }
   },
   {
    keys: ['addlistnegra',
     'addlistnegra'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isGroup) return enviar(mess.group());
      if (!isGroupAdmins && !isOwner) return enviar(mess.admin());
      if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      if (archive.antiListaNegra.value.find(value => value.group === from && value.numbers.includes(mentionedJid))) return enviar("❌ Erro! Esse membro já foi registrado na database.");
      let existGp = archive.antiListaNegra.value.find(value => value.group === from);
      if (existGp) {
       let pos = archive.antiListaNegra.value.indexOf(existGp);
       archive.antiListaNegra.value[pos].numbers.push(mentionedJid);
      } else {
       archive.antiListaNegra.value.push({
        group: from, numbers: [mentionedJid]})
      }
      fs.writeFileSync(archive.antiListaNegra.fileName, JSON.stringify(archive.antiListaNegra.value, null, 2) + '\n')
      enviar("*Membro adicionado com sucesso na lista negra.* ✅\n\nNa próxima vez que ele entrar nesse grupo será banido automaticamente!");
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     };
    }
   },
   {
    keys: ['remlistnegra',
     'remlistanegra'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isGroup) return enviar(mess.group());
      if (!isGroupAdmins && !isOwner) return enviar(mess.admin());
      if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      let position = archive.antiListaNegra.value.indexOf(archive.antiListaNegra.value.find(value => value.group === from && value.numbers.includes(mentionedJid)));
      if (position === -1) return enviar("✔️ Esse membro já foi removido da lista negra.");
      archive.antiListaNegra.value[position].numbers.splice(archive.antiListaNegra.value[position].numbers.indexOf(mentionedJid), 1);
      if (!archive.antiListaNegra.value[position].numbers.length) archive.antiListaNegra.value.splice(position, 1)
      fs.writeFileSync(archive.antiListaNegra.fileName, JSON.stringify(archive.antiListaNegra.value));
      enviar("*Membro removido com sucesso da lista negra.* ✅\n\nAgora está permitindo a participação desse membro nesse grupo!");
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     };
    }
   },
   {
    keys: ['link'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     enviar(`Link: https://chat.whatsapp.com/${await lolizita.groupInviteCode(from)}`);
    }
   },
   {
    keys: ['listadm'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     teks = `Lista de administradores do grupo: ${groupMetadata.subject}\nTotal: ${groupAdmins.length}\n\n`
     no = 0;
     for (let admon of groupAdmins) {
      no += 1;
      teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
     }
     mentions(teks, groupAdmins, false);
    }
   },
   {
    keys: ['listnegra',
     'lista-negra',
     'blacklist'],
    execution: async function() {
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins && !isOwner) return enviar(mess.admin());
     const listBannedMember = archive.antiListaNegra.value.find((obj) => obj.group === from)?.numbers;
     if (!listBannedMember) return enviar('❌ Nenhum membro registrado na lista negra!');
     teks = `× Total membros: ${listBannedMember.length}\n\n`;
     for (const item of listBannedMember) teks += `✓ @${item.split('@')[0]}\n`;
     mentions(teks, listBannedMember, false);
    }
   },
   {
    keys: ['addafk',
     'afk'],
    execution: async function() {
     const text = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     if (!text) return enviar(`❌ Sintaxe do comando incorreta.\n\n Exemplo de uso: ${prefix + comando} Estou ausente por um tempo, fui pra escola e só volto depois!`);
     addAfk(sender, from, text);
     enviar(`✅ Olá ${pushname}!\n\nSua ausência foi registrada com sucesso! Se caso alguém marcar você, eu irei falar que você está ausente no grupo.\n\nMotivo da ausência: ${getAfk(sender, from).reason}`);
    }
   },
   {
    keys: ['tagall',
     'marcar'],
    execution: async function() {
     const text = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     teks = text.length > 0 ? `⚠️ MENSAGEM DE ALERTA DO MEMBRO: ${pushname}\n\nMensagem: ${text}\n\n`: '';
     const mentionedJids = groupMembers.map(({
      id
     }) => id);
     for (const all of mentionedJids) teks += `@${all.split('@')[0]}\n`;
     mentions(teks, mentionedJids, false);
    }
   },
   {
    keys: ['addprefix',
     'setprefix'],
    execution: async function() {
     const text = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (text.length < 1) return enviar(`Erro! Comando correto: ${prefix + comando} < Novo Prefix >`);
     if (text.includes(prefix)) return enviar('❌ Impossível alterar o prefix para o mesmo prefix!');
     position = archive.changePrefix.value.findIndex((obj) => obj.groupId === from);
     if (position !== -1) {
      archive.changePrefix.value[position].prefix = text;
      enviar(`✅ Prefix alterado com sucesso!\n\n× Novo prefix: ${text}`);
      fs.writeFileSync(archive.changePrefix.fileName, JSON.stringify(archive.changePrefix.value, null, 2));
     } else {
      archive.changePrefix.value.push({
       prefix: teks, groupId: from, groupName: groupName
      });
      enviar(`⚠️ Prefix alterado com sucesso!\n\nObs: O prefixo só foi alterado para este grupo, usar comandos em outro grupo ou privado, o prefixo será outro.`);
      fs.writeFileSync(archive.changePrefix.fileName, JSON.stringify(archive.changePrefix.value, null, 2));
     }
    }
   },
   {
    keys: ['hidetag'],
    execution: async function() {
     const text = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (text.length < 1) return enviar(mess.textSyntax());
     lolizita.sendMessage(from, {
      text: text, mentions: groupMembers.map(a => a.id)})
    }
   },
   {
    keys: ['setdesc'],
    execution: async function() {
     const text = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (text.length > 500) return enviar(mess.limit());
     lolizita.groupUpdateDescription(from, text)
    }
   },
   {
    keys: ['setnome'],
    execution: async function() {
     const text = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
     if (text.length > 25) return enviar(mess.limit());
     lolizita.groupUpdateSubject(from, text);
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