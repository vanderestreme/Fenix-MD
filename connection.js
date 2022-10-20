const {
 default: makeWASocket,
  DisconnectReason,
  downloadContentFromMessage,
  makeInMemoryStore,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  proto,
  downloadMediaMessage,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  useSingleFileAuthState
 } = require('@adiwajshing/baileys');

 require("qrcode-terminal");
 const cfonts = require('cfonts')
 const pino = require('pino');
 const fs = require('fs');
 const chalk = require('chalk');
 const FileType = require('file-type')

 const {
  color,
  logs
 } = require('./db/lib/color');

 const {
  banner,
  banner2,
  bannerText
 } = require('./db/lib/banner');

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
  levelPatent,
  baileysVersion,
  messageConnection
 } = require('./db/lib/functions');

 const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
 } = require('./db/lib/exif');

 const {
  addCash
 } = require('./db/lib/_ModuFunctions');

 // Json
 const {
  archive
 } = require('./settings/function');


 const start = async () => {
  await sleep(3000)
  console.log(banner2.string);
  //console.log(require('@adiwajshing/baileys'));

  const {
  state,
  saveState
 } = useSingleFileAuthState(`./settings/${process.platform}.json`);

  /*START CONNECTION*/
  const startConnection = async () => {
   const kontol_info = console.info;
   console.info = function() {
    if (!require("util").format(...arguments).includes("Closing session: SessionEntry")) {
     return kontol_info(...arguments)
    }
   }

   const lolizita = global.lolizita = makeWASocket({
    printQRInTerminal: true,
    logger: pino({
     level: 'silent'
    }),
    browser: ['Fenix Multi Device', 'Chrome', '3.0'],
    version: await baileysVersion(),
    auth: state,
    defaultQueryTimeoutMs: undefined
   });

   /*STORE START*/
   const store = global.store = makeInMemoryStore({
    logger: pino({
     level: 'silent'
    })
   });

   store.readFromFile('./settings/store.json');
   setInterval(() => store.writeToFile('./settings/store.json'), 10000);

   store.bind(lolizita.ev);

   lolizita.ev.on('messages.upsert', m => {
    try {
     if (m.type != 'notify') return;
     const mek = m.messages[0];
     if (!mek.message) return;
     if (mek.key.fromMe) return;
     if (mek.key && mek.key.remoteJid == 'status@broadcast') return;
     require('./lolizita')(lolizita, mek, archive);
     require('./db/src/groupsCommand')(lolizita, mek, archive);
     require('./db/src/creatorCommand')(lolizita, mek, archive);
     require('./db/src/cashCommand')(lolizita, mek, archive);
    } catch (err) {
     console.log(color('[ ERROR ] ', 'red'), color(__filename),
      err);
    }
   });

   lolizita.ev.on('connection.update',
    update => {
     const {
      connection,
      lastDisconnect,
      qr
     } = update;

     switch (connection) {
      case 'open':
       messageConnection(lolizita);
       console.log(update);
       console.log(logs("Fenix conectada."))
       break;

      case 'close':
       if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        startConnection();
       } else {
        console.log(logs('Fenix', 'Erro!!!'));
       }
       break;

      default:
       if (!qr) return;
       console.log(logs('Leia o codigo qrcode abaixo!'));
      }
     });

    lolizita.ev.on('creds.update',
     saveState);

    // Remover participante do contador de mensagem
    const removeGroupParticipantMessageCount = (userId,
     groupId) => {
     const positionGp = archive._messageCount.value.groups.findIndex((obj) => obj.groupId === groupId);
     if (positionGp === -1) return;
     archive._messageCount.value.groups[positionGp].total -= archive._messageCount.value.groups[positionGp].users[userId] || 0;
     delete archive._messageCount.value.groups[positionGp].users[userId];
    };

    lolizita.ev.on('group-participants.update',
     async anu => {
      if (anu.action === 'remove') removeGroupParticipantMessageCount(anu.participants, anu.id);
      if (archive.antifake.value.includes(anu.id)) {
       if (anu.action == 'add') {
        num = anu.participants[0];
        if (!num.split('@')[0].startsWith(55)) {
         await lolizita.sendMessage(anu.id, {
          text: "🗣️ Números fake não são permitido neste grupo, banindo número fake em 3 segundos..."
         });
         lolizita.groupParticipantsUpdate(anu.id, [num], "remove")
        }
       }
      }

      if (!!archive.antiListaNegra.value.find(value => value.group === anu.id)) {
       if (archive.antiListaNegra.value.find(value => value.group === anu.id && value.numbers.includes(anu.participants[0]))) {
        try {
         ppuser = await lolizita.profilePictureUrl(num, 'image')
        } catch {
         ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
        }

        if (anu.action == 'add') {
         await lolizita.sendMessage(anu.id, {
          image: {
           url: ppuser
          }, contextInfo: {
           mentionedJid: [anu.participants[0]]},
          caption: `Membro: @${anu.participants[0].split("@")[0]}.. Registrado na lista negra! Banindo!`
         });
        }

        lolizita.groupParticipantsUpdate(anu.id, [anu.participants[0]], "remove");;
       };
      }

      if (anu.participants[0] === lolizita.user.id.split(':')[0] + '@s.whatsapp.net') {
       if (anu.action == 'remove') {
        const positionMessages = archive._messageCount.value.groups.findIndex(({
         groupId
        }) => groupId === anu.id);
        if (positionMessages !== -1) archive._messageCount.value.groups.splice(positionMessages, 1);

        const deleteSimih = archive._simih.value.findIndex((value) => value === anu.id);
        if (deleteSimih !== -1) archive._simih.value.splice(deleteSimih, 1);

        const deleteAntilink = archive.antilink.value.findIndex((value) => value === anu.id);
        if (deleteAntilink !== -1) archive.antilink.value.splice(deleteAntilink, 1);

        const deleteAntiFake = archive.antifake.value.findIndex((value) => value === anu.id);
        if (deleteAntiFake !== -1) archive.antifake.value.splice(deleteAntiFake, 1);

        const deleteWelcome = archive.welcome.value.findIndex((value) => value === anu.id);
        if (deleteWelcome !== -1) archive.welcome.value.splice(deleteWelcome, 1);

        const deleteViewOnce = archive.antiViewOnce.value.findIndex((value) => value === anu.id);
        if (deleteViewOnce !== -1) archive.antiViewOnce.value.splice(deleteViewOnce, 1);

        const deleteMessageWell = archive.textWell.value.findIndex(({
         groupId
        }) => groupId === anu.id);
        if (deleteMessageWell !== -1) archive.textWell.value.splice(deleteMessageWell, 1);
       }
      }

      if (anu.participants[0].split('@')[0].startsWith(55)) {
       if (!!archive.antiListaNegra.value.find(value => value.group === anu.id)) return;
       if (!archive.welcome.value.includes(anu.id)) return;
       try {
        let metadata = await lolizita.groupMetadata(anu.id);
        let participants = anu.participants
        for (let num of participants) {

         try {
          ppuser = await lolizita.profilePictureUrl(num, 'image')
         } catch {
          ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
         }

         try {
          ppgroup = await lolizita.profilePictureUrl(anu.id, 'image')
         } catch {
          ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
         }

         if (anu.action == 'add') {
          addCash(num, 1000);
          if (archive.textWell.value.find((obj) => obj.groupId === anu.id).welcomeMessage == null) {
           lolizita.sendMessage(anu.id, {
            image: {
             url: ppuser
            }, contextInfo: {
             mentionedJid: [num]
            }, caption: `Bem vindo(a) ${metadata.subject} @${num.split("@")[0]}`
           });
          } else {
           lolizita.sendMessage(anu.id, {
            image: {
             url: ppuser
            }, contextInfo: {
             mentionedJid: [num]
            }, caption: archive.textWell.value.find((obj) => obj.groupId === anu.id).welcomeMessage
            .replace('#membro', `@${num.split("@")[0]}`)
            .replace('#desc', metadata.desc === undefined ? "Grupo Sem Descrição!": metadata.desc.toString())
            .replace('#grupo', metadata.subject)
           });
          }
         } else if (anu.action == 'remove') {
          if (archive.textWell.value.find((obj) => obj.groupId === anu.id).exitMessage == null) {
           lolizita.sendMessage(anu.id, {
            image: {
             url: ppuser
            }, contextInfo: {
             mentionedJid: [num]}, caption: `@${num.split("@")[0]} Saiu do grupo; ${metadata.subject}`
           });
          } else {
           lolizita.sendMessage(anu.id, {
            image: {
             url: ppuser
            }, contextInfo: {
             mentionedJid: [num]
            }, caption: archive.textWell.value.find((obj) => obj.groupId === anu.id).exitMessage
            .replace('#membro', `@${num.split("@")[0]}`)
            .replace('#desc', metadata.desc === undefined ? "Grupo Sem Descrição!": metadata.desc.toString())
            .replace('#grupo', metadata.subject)
           });
          };
         };
        };
       } catch (err) {
        console.log(color(" [ERROR - WELCOME] ", "red"), {
         err
        })
       };
      }
     })

    lolizita.templateMessage = (jid,
     teks,
     buttons = [],
     quoted) => {
     lolizita.sendMessage(jid,
      {
       text: teks,
       footer: lolizita.user.name,
       buttonText: "Ler mais...",
       sections: buttons
      },
      quoted)
    }

    lolizita.sendMessageButtons = (id,
     text,
     teks,
     imageId,
     buttons = [],
     options = {}
    ) => {
     lolizita.sendMessage(id,
      {
       image: imageId,
       caption: text,
       footer: teks,
       buttons,
       headerType: 2
      },
      options);
    };

    lolizita.sendExternalAdReply = (id,
     text,
     teks,
     forText,
     imageId,
     buttons = [],
     options = {}
    ) => {
     lolizita.sendMessage(id,
      {
       document: imageId,
       caption: text,
       footer: teks,
       buttons,
       headerType: 4,
       fileName: forText,
       mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
       contextInfo: {
        externalAdReply: {
         mediaType: 1,
         renderLargerThumbnail: true,
         showAdAttribution: true,
         sourceUrl: 'https://wa.me/+5511951346335',
         mediaUrl: 'https://wa.me/+5511951346335',
         title: lolizita.user?.name || "-",
         thumbnail: imageId
        }
       }
      },
      options);
    };
    /*lolizita.sendExternalAdReply(from, linguagem.menu(prefix, hr, me), 'a', fs.readFileSync('./db/fotos/lolizita.jpg'), [{
    buttonId: `${prefix}perfil`, buttonText: {
     displayText: `✨ [ Perfil ] +`
    }, type: 1
   }], {quoted: mek});*/

    lolizita.templateImageMessage = async (jid,
     text = '',
     footer = '',
     image,
     but = [],
     options = {}) => {
     let message = await prepareWAMessageMedia(image,
      {
       upload: lolizita.waUploadToServer
      });
     var template = generateWAMessageFromContent(jid,
      proto.Message.fromObject({
       viewOnceMessage: {
        message: {
         templateMessage: {
          hydratedTemplate: {
           imageMessage: message.imageMessage,
           "hydratedContentText": text,
           "hydratedFooterText": footer,
           "hydratedButtons": but
          }
         }
        }
       }
      }
      ),
      options);
     lolizita.relayMessage(jid,
      template.message,
      {
       messageId: template.key.id
      });
    }

    lolizita.templateTextMessage = async (jid,
     text = '',
     footer = '',
     but = [],
     quoted = "",
     options = {}) => {
     var template = generateWAMessageFromContent(jid,
      proto.Message.fromObject({
       viewOnceMessage: {
        message: {
         templateMessage: {
          hydratedTemplate: {
           "hydratedContentText": text,
           "hydratedFooterText": footer,
           "hydratedButtons": but
          }
         }
        }
       }
      }),
      options,
      {
       quoted
      });
     lolizita.relayMessage(jid,
      template.message,
      {
       messageId: template.key.id
      });
    }

    lolizita.ws.on('CB:call',
     async (json) => {
      const callerId = json.content[0].attrs['call-creator']
      if (json.content[0].tag == 'offer') {
       await lolizita.sendMessage(callerId, {
        text: `Bloqueio automático do sistema!\nNão ligue para o bot!\nEntre em contato com o proprietário para desbloquea-lo!`
       })
       lolizita.updateBlockStatus(callerId, "block");
      }
     })

    lolizita.downloadMediaMessage = async (message) => {
     let mime = (message.msg || message).mimetype || ''
     let messageType = message.mtype ? message.mtype.replace(/Message/gi,
      ''): mime.split('/')[0]
     const stream = await downloadContentFromMessage(message,
      messageType)
     let buffer = Buffer.from([])
     for await(const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
     }
     return buffer
    }

    lolizita.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
     let quoted = message?.msg ? message?.msg: message
     let mime = (message.msg || message).mimetype || ''
     let messageType = message.mtype ? message.mtype.replace(/Message/gi, ''): mime.split('/')[0]
     const stream = await downloadContentFromMessage(quoted, messageType)
     let buffer = Buffer.from([])
     for await(const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
     }
     let type = await FileType.fromBuffer(buffer)
     trueFileName = attachExtension ? (filename + '.' + type.ext): filename
     // save to file
     await fs.writeFileSync(trueFileName, buffer)
     return trueFileName
    }

    lolizita.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
     let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
     let buffer
     if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options)
     } else {
      buffer = await imageToWebp(buff)
     }
     await lolizita.sendMessage(jid, {
      sticker: {
       url: buffer
      }, ...options
     }, {
      quoted
     })
     return buffer;
    }

   };
   startConnection();
  }

  start();