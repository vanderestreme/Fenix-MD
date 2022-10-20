const fs = require('fs');
const cdAFK = 86400000 // 1 dia

const {
 archive
} = require('../../settings/function');

const {
 api,
 compreSuaApikey
} = require('../../configure aqui.js');

const {
 getBuffer,
 fetchJson
} = require('./functions');

const {
 color
} = require('./color');

const {
 bannerText
} = require('./banner');

// Afk
const getAfk = (id, from) => archive._afk.value.find(obj => obj.userId === id && obj.groupId === from);

function addAfk (id, group, text) {
 const position = archive._afk.value.findIndex(obj => obj.userId === id && obj.groupId === group);
 if (position === -1) {
  archive._afk.value.push({
   timestamp: Date.now(),
   groupId: group,
   userId: id,
   reason: text
  });
 } else {
  _afk[position].reason = text;
 };
 fs.writeFileSync(archive._afk.fileName, JSON.stringify(archive._afk.value, null, 2));
}

function removeAfk (id, from) {
 const position = archive._afk.value.findIndex(obj => obj.userId === id && obj.groupId === from);
 if (position !== -1)
  archive._afk.value.splice(position, 1);
 fs.writeFileSync(archive._afk.fileName, JSON.stringify(archive._afk.value, null, 2));
}

function getRemoteAfk(id, groupId, pushname, enviar, isNotGroup) {
 if (!isNotGroup) return;
 if (archive._afk.value.findIndex(value => value.groupId === groupId && value.userId === id) === -1) return;
 enviar(`Oi ${pushname}! Você de novo aqui? Vou retirar sua ausência do banco de dados.`);
 removeAfk(id, groupId);
}

function remAfk(userId, groupId) {
 if (archive._afk.value.findIndex(value => value.groupId === groupId && value.userId === userId) === -1) return;
 const objsFound = archive._afk.value.filter((x) => (cdAFK - (Date.now() - x.timestamp) <= 0));
 objsFound.forEach((i) => removeAfk(i.userId, i.groupId));
}

// Contador de mensagens
/* Caso for zerar o Json: { "groups": [], "users": [] } */
function addMessage(userId, groupId, isGroup) {
 userId = userId.replace(/:\d*?(?=@)/g, '');
 if (isGroup) {
  const positionGp = archive._messageCount.value.groups.findIndex((obj) => obj.groupId === groupId);
  if (positionGp === -1) {
   archive._messageCount.value.groups.push({
    groupId: groupId, total: 1,
    users: {[userId]: 1
    }});
  } else {
   archive._messageCount.value.groups[positionGp].total++;
   archive._messageCount.value.groups[positionGp].users[userId] = (archive._messageCount.value.groups[positionGp].users[userId] || 0) + 1;
  };
 } else {
  const positionGp = archive._messageCount.value.users.findIndex((obj) => obj.id === userId);
  if (positionGp === -1) {
   archive._messageCount.value.users.push({
    id: userId,
    total: 1,
    timestamp: Date.now()
   });
  } else {
   archive._messageCount.value.users[positionGp].total++;
  };
 };
 fs.writeFileSync(archive._messageCount.fileName, JSON.stringify(archive._messageCount.value, null, 4));
};

// Pushname
function savePushName(id, pushName) {
 const positionId = archive._pushNames.value.indexOf(archive._pushNames.value.find((obj) => obj.id === id));
 if (positionId === -1) {
  archive._pushNames.value.push({
   id, pushName
  });
 } else {
  if (archive._pushNames.value[positionId].pushName === pushName) return;
  archive._pushNames.value[positionId].pushName = pushName;
 };
 fs.writeFileSync(archive._pushNames.fileName, JSON.stringify(archive._pushNames.value, null, 4));
};

// Test
const moment = require('moment-timezone')

function messageOwner(lolizita, from, prefix) {
 const dateCurrently = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY');
 const timestamp = archive.groupDays.value.find(x => x.time === dateCurrently);

 switch (dateCurrently) {
  case timestamp?.time: {
   const message = {
    ownerGroup: `⚠️ ATENÇÃO! PAGAMENTO DO ALUGUEL NECESSÁRIA! ⚠️\n\n ❌ Valor do aluguel: ${timestamp.valor}\n ⏰ Data do pagamento: ${timestamp.time}\n ✔️ Tipo do grupo: ${timestamp.type}\n\nObservação: Seu aluguel de ${timestamp.valor}, registrado no dia: ${timestamp.time} se expira automaticamente hoje!`,
    ownerBot: `❌ ALUGUEL EXPIRADO! 💢\n\n💵 Valor do aluguel: ${timestamp.valor};\n ⏰ Data do pagamento: ${timestamp.time};\n ✔️ Tipo do grupo: ${timestamp.type};\n\nVEJA AS OPÇÕES ABAIXO.`,
   }

   lolizita.sendMessage(timestamp.owner, {
    text: message.ownerGroup
   });

   for (const allOwner of archive.settings.value.owner) lolizita.templateMessage(allOwner, message.ownerBot, [{
    title: "MENU - ALUGUEL", rows: [{
     title: "💢 BANIR GRUPO",
     rowId: `${prefix}addbangruopremium ${from}`,
     description: 'Nenhum comando será respondido;'
    }, {
     title: "✅ DESBANIR GRUPO",
     rowId: `${prefix}rembangroup ${from}`,
     description: 'Os membros usaram comandos;'
    }, {
     title: "📵 SAIR DO GRUPO",
     rowId: `${prefix}sairgroup ${from}`,
     description: 'O bot sairá do grupo;'
    }, {
     title: "🚶🏻 ENTRAR DO GRUPO",
     rowId: `${prefix}entrargroup ${from}`,
     description: 'O bot entrará de novo no grupo;'
    }, {
     title: "✔️ EMITIR OUTRO ALUGUEL",
     rowId: `${prefix}addpremiumgroup ${timestamp.groupId}|${timestamp.time.split('/')[0]}/${String(Number(timestamp.time.split('/')[1]) + 1).padStart(2, 0)}/${timestamp.time.split('/')[2]}|${timestamp.valor}|${timestamp.type}`,
     description: 'Será emitido outro pagamento no próximo mês;'
    }]}]);

   const position = archive.groupDays.value.findIndex(x => x.time === dateCurrently);
   if (position !== -1) archive.groupDays.value.splice(position, 1);
   fs.writeFileSync(archive.groupDays.fileName, JSON.stringify(archive.groupDays.value, null, 2));
  }
   break;

  default:
   /* code */
  }
 }

 const getAluguel = (jid) => archive.groupDays.value?.find(x => x.groupId === jid) || [];
 const isGetAluguel = (jid, isGroup) => isGroup ? archive.groupDays.value.findIndex(x => x.groupId === jid) !== -1: false;

 // Registrar erros
 function registreErrs(lolizita, comando, err, id) {
  const position = archive.registerError.value.findIndex(x => x.command === comando);
  if (position === -1) {
   obj = {
    total: 1,
    userId: id,
    command: comando,
    acquiredError: [String(err)]
   };
   archive.registerError.value.push(obj);
  } else {
   if (!archive.registerError.value[position].acquiredError.includes(String(err))) archive.registerError.value[position].acquiredError.push(String(err));
   archive.registerError.value[position].total += 1;
  };
  fs.writeFileSync(archive.registerError.fileName, JSON.stringify(archive.registerError.value, null, 2));
  lolizita.sendMessage(archive.settings.value.owner[0], {
   text: `❌ ERRO DE COMANDO! ⚠️\n\n- Comando: ${comando}\n- Erro: ${String(err)}\n`
  })
 }

 const getRegisteredRError = (commandId, userId) => {
  const position = archive.registerError.value.findIndex(x => (x.userId === userId && x.command === commandId));
  if (position !== -1) return archive.registerError.value[position];
 }

 function addCashMessage(user, pushname) {
  const position = archive.cash.value.findIndex(x => x.userId === user);
  if (position === -1) {
   const obj = {
    userId: user,
    pushName: pushname,
    cash: 0
   }
   archive.cash.value.push(obj);
  } else {
   if (archive.cash.value[position].pushName !== pushname) archive.cash.value[position].pushName = pushname;
   archive.cash.value[position].cash += 1;
  };
  fs.writeFileSync(archive.cash.fileName, JSON.stringify(archive.cash.value, null, 2));
 }

 function removeCash(user, number) {
  const position = archive.cash.value.findIndex(x => x.userId === user);
  archive.cash.value[position].cash -= number;
  fs.writeFileSync(archive.cash.fileName, JSON.stringify(archive.cash.value, null, 2));
 }

 function addCash(user, number) {
  const position = archive.cash.value.findIndex(x => x.userId === user);
  if (position === -1) {
   const obj = {
    userId: user,
    pushName: null,
    cash: 0
   }
   archive.cash.value.push(obj);
  } else {
   archive.cash.value[position].cash += number;
   fs.writeFileSync(archive.cash.fileName, JSON.stringify(archive.cash.value, null, 2));
  };
 }

 function groupMessage(userJid, groupJid, enviar, isGroup) {
  if (!isGroup) return;
  const value = archive._messageCount.value.groups.find(v => (v.groupId === groupJid && v.users[userJid]))?.users[userJid] || 0;
  if (value === 1) addCash(userJid, 500);
 }

 // mensagens no privado
 function privateMember(userId, jid, isGroup, lolizita, pushname, prefix, mek) {
  if (isGroup) return;
  addCash(userId, 500);
  const position = archive._messageCount.value.users?.find(({
   id
  }) => id === userId)?.total || 2;
  if (position === 1) lolizita.templateMessage(jid, `🇧🇷 Olá ${pushname}. Em que posso te ajudar?\n\nNão sabe? Isso significa que não sabe o que eu posso fazer né? Então, aperte o botão abaixo! Mas, se caso não conseguiu achar o que você estava procurando, porque não ir perguntar no privado do meu dono? Ele poderá lhe responder.`, [{
   title: "MENU (Seis módulos de Bem Vindo);", rows: [{
    title: "🔗 [ MENU PRINCIPAL ]", rowId: prefix + 'menu'
   }, {
    title: "🔗 [ LOGOS - EDIÇÕES ]", rowId: prefix + 'logos'
   }, {
    title: "🔗 [ JOGOS - BRINCADEIRAS ]", rowId: prefix + 'jogos'
   }, {
    title: "🔗 [ ANIMES - HENTAIS ]", rowId: prefix + 'animes'
   }, {
    title: "🔗 [ DOWNLOADS ]", rowId: prefix + 'download'
   }, {
    title: "🔗 [ CONSULTAS ]", rowId: prefix + 'consultas'
   }, {
    title: "🔗 [ PESQUISAS ]", rowId: prefix + 'pesquisa'
   }, {
    title: "🔗 [ FIGURINHAS ]", rowId: prefix + 'figurinhas'
   }]}], {
   quoted: mek
  });
 }

 function deleteMembersCount(jid, membersId) {
  const mssIndex = archive._messageCount.value.groups.findIndex(obj => obj.groupId === jid);
  if (mssIndex !== -1) {
   const noMembers = Object.keys(archive._messageCount.value.groups[mssIndex].users).filter(user => !membersId.includes(user));
   for (const user of noMembers) delete archive._messageCount.value.groups[mssIndex].users[user];
  };
 }

 function firstMessage(jid, isGroup, sender, pushname, prefix, lolizita, mek) {
  const groupUsersMess = archive._messageCount.value.groups.find(obj => obj.groupId === jid);
  if (groupUsersMess && isGroup) {
   if (sender in groupUsersMess.users)
    if (!(groupUsersMess.users[sender] % 100))
    lolizita.sendMessageButtons(jid, `*✨ Parabéns ${pushname} 🎉\n\n• Mensagens: ${groupUsersMess.users[sender]}\n• Próximo rank: ${100 + groupUsersMess.users[sender]}`, archive.mess.value.mess.nameEnter(lolizita.user), archive.mess.value.mess.logo(), [{
    buttonId: `${prefix}perfil`, buttonText: {
     displayText: `✨ [ Perfil ] +`
    }, type: 1
   }], {
    quoted: mek
   });
  };
 }

 const getCashNumber = (userId) => {
  const position = archive.cash.value.findIndex(x => x.userId === userId);
  return archive.cash.value[position]?.cash;
 }

 const getCash = (userId) => {
  const position = archive.cash.value.findIndex(x => x.userId === userId);
  return (archive.cash.value[position]?.cash < 0 ? '-': '') + String(archive.cash.value[position]?.cash).replace('-', '').split("").reverse().reduce((str, num, ind, arr) => `${str}${!((ind + 1) % 3) && (ind + 1) < arr.length ? num + '.': num}`).split('').reverse().join('')
 }

 const cashGet = (value) => (value < 0 ? '-': '') + String(value).replace('-', '').split("").reverse().reduce((str, num, ind, arr) => `${str}${!((ind + 1) % 3) && (ind + 1) < arr.length ? num + '.': num}`).split('').reverse().join('');

 function donateCash(userId, mentionedJid, amount, enviar, lolizita, mek, jid, prefix) {
  console.log({
   userId, mentionedJid, amount, mek, jid, prefix
  });
  const position = (mention) => archive.cash.value.findIndex(x => x.userId === mention);

  if (position(mentionedJid) === -1) return enviar(`*Membro não registrado no banco de dados!* ❌`);
  const teks = `*Transferência concluída!* ✅\n\n💰*Info Transferência - Recebidor*:\n- *Nome*: ${archive.cash.value[position(mentionedJid)].pushName}\n- *Cash's antigo*: ${cashGet(archive.cash.value[position(mentionedJid)].cash)}\n- *Total cash's*: ${cashGet(archive.cash.value[position(mentionedJid)].cash + Number(amount))}\n\n➖➖➖➖➖➖➖➖➖\n\n💰 *Info Transferência - Transferidor*:\n- *Nome*: ${archive.cash.value[position(userId)].pushName}\n- *Cash's antigo*: ${getCash(userId)}\n- *Total cash's*: ${(archive.cash.value[position(userId)].cash - amount < 0 ? '-': '') + String(archive.cash.value[position(userId)].cash - amount).replace('-', '').split("").reverse().reduce((str, num, ind, arr) => `${str}${!((ind + 1) % 3) && (ind + 1) < arr.length ? num + '.': num}`).split('').reverse().join('')}`;

  lolizita.sendExternalAdReply(jid, `𒄬 Seu cash total: ${getCash(userId)}`, teks, `Olá ${archive.cash.value[position(userId)].pushName}!`, archive.mess.value.mess.logo(), [{
   buttonId: `${prefix}perfil`, buttonText: {
    displayText: `✨ [ Perfil ] +`
   }, type: 1
  }], {
   quoted: mek
  });

  removeCash(userId, Number(amount));
  addCash(mentionedJid, Number(amount));
 }

 function contactOwner(jid, lolizita, mek) {
  const ownerName = archive._pushNames.value.find(v => v.id === archive.settings.value.owner[0])?.pushName || "-";
  lolizita.relayMessage(jid, {
   "contactMessage": {
    "displayName": ownerName,
    "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:;Tobi:/;;;\nFN:Tobi:/\nitem1.TEL;waid=559481417512:+55 94 8141-7512\nitem1.X-ABLabel:Celular\nEND:VCARD",
    contextInfo: {
     externalAdReply: {
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true,
      sourceUrl: `https://wa.me/${archive.settings.value.owner[0].split('@')[0]}?text=Vim+pelo+seu+bot!`,
      title: `Chama o meu dono: ${ownerName}`,
      thumbnail: archive.mess.value.mess.logo()
     }
    }
   }
  }, {
   messageId: mek.key.id
  });
 }

 function reacting(text, lolizita, mek) {
  lolizita.sendMessage(mek.key.remoteJid, {
   react: {
    text: text,
    key: mek.key
   }
  });
 }

 const toJson = (text) => {
  return JSON.stringify(text, null, 2);
 }

 const statusBot = async(sock, runtime) => {
  console.log(color('[ STATUS CONNECTED! ]', 'red'));
  await sock.updateProfileStatus(`Tempo online: [ ${runtime(process.uptime())} ]`);
 }

async function checkApikey() {
  const {
   status
  } = await fetchJson(`${api}/api/cekapikey?apikey=${compreSuaApikey}`);
  return status; 
  //if (status == 'offline') return "*Falha!! Comando sem token.* ⚠️";
 }

 function stealCash(userId, number, jid, mek, lolizita) {
  console.log({
   userId, number
  })
  const position = archive.cash.value.findIndex(x => x.userId === userId);
  if (position === -1 || archive.cash.value[position].cash < 10) return lolizita.sendMessage(jid, {
   text: `*Esse membro não tem cash para ser roubado!* ❌`
  }, {
   quoted: mek
  });

  const getRandomMessage = (max = 0, min = 0) => Math.floor(Math.random() * max) + min;
  const remoteJid = mek.key.participant ? mek.key.participant: mek.participant;
  const randomCash = (number) => getRandomMessage(number);
  const membro = randomCash(archive.cash.value[position].cash);
  const ladrão = randomCash(archive.cash.value.find(x => x.userId === remoteJid).cash);

  switch (getRandomMessage(number)) {
   case 0:
    case 1:
     case 2:
      lolizita.sendMessage(jid, {
       text: `O @${archive.cash.value[position].userId.split('@')[0]} estava armado e te viu invadindo sua casa, você não roubou nada e ainda teve que ir pro hospital -${ladrão} de cash`, mentions: [archive.cash.value[position].userId]}, {
       quoted: mek
      }).finally(() => reacting('❌', lolizita, mek));
      removeCash(remoteJid, ladrão);
      break;

     case 3:
      case 4:
       case 5:
        lolizita.sendMessage(jid, {
         text: `Você acabou sendo mordido pelo Pitbull do @${archive.cash.value[position].userId.split('@')[0]} e não conseguiu roubar nada.`, mentions: [archive.cash.value[position].userId]}, {
         quoted: mek
        }).finally(() => reacting('❌', lolizita, mek));
        break;

       case 6:
        case 7:
         case 8:
          lolizita.sendMessage(jid, {
           text: `O alarme da casa do @${archive.cash.value[position].userId.split('@')[0]} disparou e vc acabou sendo preso, além de perder -${ladrão} cash!`, mentions: [archive.cash.value[position].userId]}, {
           quoted: mek
          }).finally(() => reacting('❌', lolizita, mek));
          addCash(archive.cash.value[position].userId, ladrão);
          removeCash(remoteJid, ladrão);
          break;

         case 9:
          case 10:
           case 11:
            lolizita.sendMessage(jid, {
             text: `Ao pular a cerca você acabou se machucando e conseguiu roubar ${membro} de cash!`, mentions: [archive.cash.value[position].userId]}, {
             quoted: mek
            }).finally(() => reacting('✅', lolizita, mek));
            addCash(remoteJid, membro);
            removeCash(archive.cash.value[position].userId, membro);
            break;

           case 12:
            case 13:
             case 14:
              case 15:
               lolizita.sendMessage(jid, {
                text: `Você tentou roubar ${membro} da bolsa do @${archive.cash.value[position].userId.split('@')[0]}, mas ele acordou por causa do barulho e tu fugiu deixando ${ladrão} de cash's!`, mentions: [archive.cash.value[position].userId]}, {
                quoted: mek
               }).finally(() => reacting('❌', lolizita, mek));
               addCash(archive.cash.value[position].userId, ladrão);
               removeCash(remoteJid, ladrão);
               break;

              default:
               // code
              }
            }

            module.exports = {
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
           }

           let file = require.resolve(__filename);
           fs.watchFile(file, () => {
            fs.unwatchFile(file);
            console.log(bannerText(`Update file: ${__filename}`).string);
            delete require.cache[file];
            require(file);
          });