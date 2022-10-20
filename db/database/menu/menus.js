const fs = require("fs");
const chalk = require('chalk')

//menu 
exports.menu = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ 🥀 Fenix Multi - Device 🥀
＊ ╭═══×
＊ ⌁  PREFIXO:「${prefix}」
＊ ⌁  HORA: ${hr}
＊ ⌁  NOME: ${me?.name || "-"}
＊ ╰═══×
＊
＊ ⚠︎ Comandos
＊ ╭═══×
＊ ⌁  ${prefix}Perfil
＊ ⌁  ${prefix}Nick「Texto」
＊ ⌁  ${prefix}Play「Titulo」
＊ ⌁  ${prefix}Attp1「Texto」
＊ ⌁  ${prefix}Togif「Sticker」
＊ ⌁  ${prefix}Playlist「Titulo」
＊ ⌁  ${prefix}Toimg「Sticker」
＊ ⌁  ${prefix}Rename「Sticker」
＊ ⌁  ${prefix}Xvideosplay「Link」 
＊ ⌁  ${prefix}Emojimix「😭+😘」
＊ ⌁  ${prefix}Audiomeme「Nome」 
＊ ╰═══×
＊
＊ ⚠︎ Menus
＊ ╭═══×
＊ ⌁  ${prefix}Grupo
＊ ⌁  ${prefix}Logos
＊ ⌁  ${prefix}Jogos
＊ ⌁  ${prefix}Criador
＊ ⌁  ${prefix}Animes
＊ ⌁  ${prefix}Download
＊ ⌁  ${prefix}Consultas
＊ ⌁  ${prefix}Pesquisas
＊ ⌁  ${prefix}Figurinhas
＊ ╰═══×
╰━━━ ~~`
}

//download 
exports.download = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 ρᥣᥲᥡᥱr᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Play「Nome」 
＊ ⌁  ${prefix}Playvid「Nome」 
＊ ⌁  ${prefix}Audiomeme「Nome」 
＊ ⌁  ${prefix}Ytmp3「Link」 
＊ ⌁  ${prefix}Ytmp4「Link」 
＊ ╰═══×
＊
＊ 〘 ρ᥆rᥒ᥆ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Xnxxplay「Link」 
＊ ⌁  ${prefix}Xvideosplay「Link」 
＊ ╰═══×
＊
＊ 〘 d᥆ᥕᥒᥣ᥆ᥲd 〙
＊ ╭═══×
＊ ⌁  ${prefix}Twitter「Link」  
＊ ╰═══×
╰━━━ ~~`;
}

//grupo 
exports.grupo = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 bᥲᥒιr 〙
＊ ╭═══×
＊ ⌁  ${prefix}Kick「Msg」
＊ ⌁  ${prefix}Banir「@Tag」
＊ ╰═══×
＊
＊ 〘 ρr᥆m᥆᥎ᥱr 〙
＊ ╭═══×
＊ ⌁  ${prefix}Promote「Msg」
＊ ⌁  ${prefix}Promover「@Tag」
＊ ╰═══×
＊
＊ 〘 rᥱbᥲι᥊ᥲr 〙
＊ ╭═══×
＊ ⌁  ${prefix}Demote「Msg」
＊ ⌁  ${prefix}Rebaixar「@Tag」
＊ ╰═══×
＊
＊ 〘 ᥲdιᥴι᥆ᥒᥲr 〙
＊ ╭═══×
＊ ⌁  ${prefix}Add「Msg」
＊ ⌁  ${prefix}Reviver「Numero」
＊ ╰═══×
＊
＊ 〘 ᥲbrιr/fᥱᥴhᥲr 〙
＊ ╭═══×
＊ ⌁  ${prefix}Abrir
＊ ⌁  ${prefix}Group
＊ ⌁  ${prefix}Fechar
＊ ╰═══×
＊
＊ 〘 ᥴ᥆ᥒtᥲd᥆r 〙
＊ ╭═══×
＊ ⌁  ${prefix}Ativos
＊ ⌁  ${prefix}Inativos
＊ ⌁  ${prefix}Banghost
＊ ⌁  ${prefix}Notifyghosts
＊ ╰═══×
＊
＊ 〘 Aᥒtι᥉/Oᥙtr᥆᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Simih「On/Off」
＊ ⌁  ${prefix}Antilink「On/Off」
＊ ⌁  ${prefix}Antifake「On/Off」
＊ ⌁  ${prefix}Welcome「On/Off」
＊ ⌁  ${prefix}Viewonce「On/Off」
＊ ⌁  ${prefix}Addwelcome「Text」
＊ ⌁  ${prefix}exitwelcome「Text」
＊ ⌁  ${prefix}Addlistnegra「@Tag」
＊ ⌁  ${prefix}Remlistnegra「@Tag」
＊ ╰═══×
＊
＊ 〘 ᥆ᥙtr᥆᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Link
＊ ⌁  ${prefix}Listadm
＊ ⌁  ${prefix}Perfil
＊ ⌁  ${prefix}Listnegra
＊ ⌁  ${prefix}Addafk「Texto」
＊ ⌁  ${prefix}Perfil「@Tag」
＊ ⌁  ${prefix}Tagall「Texto」
＊ ⌁  ${prefix}Setprefix「Text」
＊ ⌁  ${prefix}Hidetag「Texto」
＊ ⌁  ${prefix}Setdesc「Texto」
＊ ⌁  ${prefix}Setnome「Texto」
＊ ╰═══×
╰━━━ ~~`
}

//logos 
exports.logos = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 ᥱfᥱιt᥆᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Gay「Foto」
＊ ⌁  ${prefix}Rip「Foto」
＊ ⌁  ${prefix}Trash「Foto」
＊ ⌁  ${prefix}Poutine「Foto」
＊ ⌁  ${prefix}Beautiful「Foto」
＊ ⌁  ${prefix}Delete「Foto」
＊ ⌁  ${prefix}Bobross「Foto」
＊ ⌁  ${prefix}Hitler「Foto」
＊ ⌁  ${prefix}Notpoutine「Foto」
＊ ⌁  ${prefix}Wasted「Foto」
＊ ⌁  ${prefix}Komunis「Foto」
＊ ⌁  ${prefix}Triggered「Foto」
＊ ⌁  ${prefix}Bolsonaro「Foto」
＊ ⌁  ${prefix}Cinza「Foto」
＊ ⌁  ${prefix}Embacado「Foto」
＊ ⌁  ${prefix}Invert「Foto」
＊ ⌁  ${prefix}Facepalm「Foto」
＊ ⌁  ${prefix}Tumulo「Foto」
＊ ⌁  ${prefix}Preso「Foto」
＊ ⌁  ${prefix}Wanted「Foto」
＊ ⌁  ${prefix}Rotate「Foto」
＊ ⌁  ${prefix}Patrick「Foto」
＊ ⌁  ${prefix}Sepia「Foto」
＊ ⌁  ${prefix}Hacker「Foto」
＊ ⌁  ${prefix}Hacker2「Foto」
＊ ╰═══×
＊
＊ 〘 ᥣ᥆g᥆᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Lava「Texto」
＊ ⌁  ${prefix}Berry「Texto」
＊ ⌁  ${prefix}Toxic「Texto」
＊ ⌁  ${prefix}Snow「Texto」
＊ ⌁  ${prefix}Blood「Texto」
＊ ⌁  ${prefix}3dbox「Texto」
＊ ⌁  ${prefix}Matrix「Texto」
＊ ⌁  ${prefix}3dglue「Texto」
＊ ⌁  ${prefix}Metallic「Texto」
＊ ⌁  ${prefix}Thunder「Texto」
＊ ⌁  ${prefix}Artpaper「Texto」
＊ ⌁  ${prefix}Thunder2「Texto」
＊ ⌁  ${prefix}Neonlight「Texto」
＊ ⌁  ${prefix}Neonlight「Texto」
＊ ⌁  ${prefix}1917style「Texto」
＊ ⌁  ${prefix}Chocolate「Texto」
＊ ⌁  ${prefix}Black-pink「Texto」
＊ ⌁  ${prefix}Christmas「Texto」
＊ ⌁  ${prefix}Embossed「Texto」
＊ ⌁  ${prefix}Luxurygold「Texto」
＊ ⌁  ${prefix}Drop-water「Texto」
＊ ⌁  ${prefix}Magmahot「Texto」
＊ ⌁  ${prefix}3d-gradient「Texto」
＊ ⌁  ${prefix}Harrypotter「Texto」
＊ ⌁  ${prefix}Sandwriting「Texto」
＊ ⌁  ${prefix}Greenhorror「Texto」
＊ ⌁  ${prefix}Horrorblood「Texto」
＊ ⌁  ${prefix}Bearmascot「Texto」
＊ ⌁  ${prefix}Transformer「Texto」
＊ ⌁  ${prefix}Sandsummer「Texto」
＊ ⌁  ${prefix}Realisticcloud「Texto」
＊ ⌁  ${prefix}Xmascards3d「Texto」
＊ ⌁  ${prefix}Futuristicneon「Texto」
＊ ⌁  ${prefix}Sciencefiction「Texto」
＊ ⌁  ${prefix}Natural-leaves「Texto」
＊ ⌁  ${prefix}Summerysand「Texto」
＊ ⌁  ${prefix}Sandengraved「Texto」
＊ ⌁  ${prefix}Metaldarkgold「Texto」
＊ ⌁  ${prefix}Captainamerica「Texto」
＊ ⌁  ${prefix}Neondevilwings「Texto」
＊ ⌁  ${prefix}Impressiveglitch「Texto」
＊ ⌁  ${prefix}Wonderfulgraffiti「Texto」
＊ ╰═══×
╰━━━ ~~`
}

//jogos 
exports.jogos = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 ᥴᥲ᥉h 〙
＊ ╭═══×
＊ ⌁  ${prefix}Cash
＊ ⌁  ${prefix}Rankcash
＊ ⌁  ${prefix}Roubar「@Tag」
＊ ⌁  ${prefix}Usercash「@Tag」
＊ ⌁  ${prefix}Transferir「@Tag|Quantia」
＊ ╰══×
＊
＊ 〘 j᥆g᥆᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Dado
＊ ⌁  ${prefix}Slot
＊ ⌁  ${prefix}Roleta
＊ ⌁  ${prefix}Tagme
＊ ⌁  ${prefix}Cassino
＊ ⌁  ${prefix}Caracoroa
＊ ⌁  ${prefix}roletarussa
＊ ⌁  ${prefix}Sn「Text」
＊ ⌁  ${prefix}Nick「Texto」
＊ ⌁  ${prefix}Corno「@Tag」
＊ ⌁  ${prefix}Amongus「@Tag」
＊ ╰═══×
＊
＊ 〘 ρ᥆rᥴᥱᥒtᥲgᥱm 〙
＊ ╭═══×
＊ ⌁  ${prefix}Feio
＊ ⌁  ${prefix}Lixo
＊ ⌁  ${prefix}Gado
＊ ⌁  ${prefix}Burro
＊ ⌁  ${prefix}Gordo
＊ ⌁  ${prefix}Pobre
＊ ⌁  ${prefix}Bonito
＊ ⌁  ${prefix}Macaco
＊ ⌁  ${prefix}Gostoso
＊ ╰═══×
╰━━━ ~~`
}

//criador 
exports.criador = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 ᥴrιᥲd᥆r 〙
＊ ╭═══×
＊ ⌁  ${prefix}Mek
＊ ⌁  ${prefix}Eval
＊ ⌁  ${prefix}Sair
＊ ⌁  ${prefix}Ping
＊ ⌁  ${prefix}Prem
＊ ⌁  ${prefix}Entrar
＊ ⌁  ${prefix}Reiniciar
＊ ⌁  ${prefix}Addpremium
＊ ⌁  ${prefix}Divu「Text」
＊ ⌁  ${prefix}Setprefix「Text」
＊ ⌁  ${prefix}Addban「@Tag」
＊ ⌁  ${prefix}Remban「@Tag」
＊ ⌁  ${prefix}Crash「@Membro」
＊ ⌁  ${prefix}Bangroup「On/Off」
＊ ⌁  ${prefix}Divulgar「Link+Texto」
＊ ╰═══×
╰━━━ ~~`
}

//animes 
exports.animes = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 ᥲᥒιmᥱ᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Akame
＊ ⌁  ${prefix}Tatsumi
＊ ⌁  ${prefix}Najenda
＊ ⌁  ${prefix}Kurome
＊ ⌁  ${prefix}Bulat
＊ ⌁  ${prefix}Leone
＊ ⌁  ${prefix}Mine
＊ ⌁  ${prefix}Chelsea
＊ ⌁  ${prefix}Loli
＊ ⌁  ${prefix}Zoro
＊ ⌁  ${prefix}Luffy
＊ ⌁  ${prefix}Oden
＊ ⌁  ${prefix}Nami
＊ ⌁  ${prefix}Jinbe
＊ ⌁  ${prefix}Kaido
＊ ⌁  ${prefix}Robin
＊ ⌁  ${prefix}Usopp
＊ ⌁  ${prefix}Franky
＊ ⌁  ${prefix}Yamato
＊ ⌁  ${prefix}Esdeath
＊ ╰═══×
＊
＊ 〘 hᥱᥒtᥲι᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Ero
＊ ⌁  ${prefix}Yuri
＊ ⌁  ${prefix}Ass
＊ ⌁  ${prefix}Foot
＊ ⌁  ${prefix}Orgy
＊ ⌁  ${prefix}Jahy
＊ ⌁  ${prefix}Bdsm
＊ ⌁  ${prefix}Pussy
＊ ⌁  ${prefix}Hentai
＊ ⌁  ${prefix}Thighs
＊ ⌁  ${prefix}Panties
＊ ⌁  ${prefix}Ahegao
＊ ⌁  ${prefix}Blowjob
＊ ⌁  ${prefix}Cuckold
＊ ⌁  ${prefix}Nsfwloli
＊ ⌁  ${prefix}Femdom
＊ ⌁  ${prefix}Sfwneko
＊ ⌁  ${prefix}Tentacles
＊ ⌁  ${prefix}Nsfwneko
＊ ⌁  ${prefix}Masturbation
＊ ╰═══×
╰━━━ ~~`
}

//figurinhas 
exports.figurinhas = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 fιgᥙrιᥒhᥲ 〙
＊ ╭═══×
＊ ⌁  ${prefix}F「Foto/Gif」
＊ ⌁  ${prefix}stickertake「Nome|Autor」
＊ ╰═══×
＊
＊ 〘 ᥉tιᥴkᥱr 〙
＊ ╭═══×
＊ ⌁  ${prefix}Attp「Texto」
＊ ⌁  ${prefix}Attp1「Texto」
＊ ⌁  ${prefix}Attp2「Texto」
＊ ⌁  ${prefix}Attp3「Texto」
＊ ⌁  ${prefix}Attp4「Texto」
＊ ⌁  ${prefix}Attp5「Texto」
＊ ⌁  ${prefix}Attp6「Texto」
＊ ⌁  ${prefix}Togif「Sticker」
＊ ⌁  ${prefix}Toimg「Sticker」
＊ ⌁  ${prefix}Tourl「Imagem」
＊ ⌁  ${prefix}Emojimix「😭+😘」
＊ ⌁  ${prefix}Rename「Sticker」
＊ ╰═══×
╰━━━ ~~`
}

//consultas 
exports.consultas = (prefix, hr, me) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 ᥴ᥆ᥒ᥉ᥙᥣtᥲ᥉ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Gcpf
＊ ⌁  ${prefix}Gbank
＊ ⌁  ${prefix}Gcnpj
＊ ⌁  ${prefix}Ip「Codigo」
＊ ⌁  ${prefix}Cep「Codigo」
＊ ⌁  ${prefix}DDD「Codigo」
＊ ⌁  ${prefix}Banco「Codigo」
＊ ╰═══×
╰━━━ ~~`
}

exports.ping = (prefix, nameBot, latensi, process) => {
return `
╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefix:「${prefix}」
＊ ⌁  Nome:「${nameBot}」
＊ ⌁  Ping:「${latensi.toFixed(4)}」
＊ ⌁  Plataforma:「${process.platform}」
＊ ╰═══×
╰━━━ ~~`
};

exports.infoStore = (archive) => {
 return `╭━━ ~~
＊ ╭═══×
＊ ⌁ Erros registrados: *${archive.registerError.value.length}*
＊ ⌁ Grupos alugados: *${archive.groupDays.value.length}*
＊ ⌁ Grupos com prefix alterado: *${archive.changePrefix.value.length}*
＊ ⌁ Grupos registrados no store: *${archive.store.value.chats.filter(a => a.id.includes("@g.us")).length}*
＊ ⌁ Pessoas registrados no store: *${archive.store.value.chats.filter(a => a.id.includes("@s.whatsapp.net")).length}*
＊ ╰═══×
╰━━━ ~~`;
}

exports.search = (prefix, hr, me) => {
return `╭━━ ~~
＊ ⚠︎ | Info
＊ ╭═══×
＊ ⌁  Prefixo:「${prefix}」
＊ ⌁  Hora: ${hr}
＊ ⌁  Nome: ${me?.name || "-"}
＊ ╰═══×
＊
＊ 〘 Pᥱ᥉qᥙι᥉ᥲ 〙
＊ ╭═══×
＊ ⌁  ${prefix}Live「Nome」
＊ ⌁  ${prefix}Uptodown「Nome」
＊ ⌁  ${prefix}Hentaistube「Nome」
＊ ⌁  ${prefix}Googleimage「Nome」
＊ ╰═══×
╰━━━ ~~`;
};

exports.groupStatus = (getGroupMessageTotal, from, participants, ghosts, idMembers, isAntiLink, isWelcome, isViewOnce, isAntiFake, isSimih) => {
return `╭━━ ~~
＊ ⚠︎ Status
＊ ╭═══×
＊ ⌁ Mensagens: ${getGroupMessageTotal(from)}
＊ ⌁ Membros: ${participants.map((obj) => obj.id).length}
＊ ⌁ Membros Ativos: ${idMembers.length + 1}
＊ ⌁ Membros inativos: ${ghosts.length}
＊ ╰═══×
＊
＊ ⚠︎ Funções 
＊ ╭═══×
＊ ⌁ Simih: ${isSimih ? 'Ativo': 'Desativado'}
＊ ⌁ Anti link: ${isAntiLink ? 'Ativo': 'Desativado'}
＊ ⌁ Anti fake: ${isAntiFake ? 'Ativo': 'Desativado'}
＊ ⌁ View once: ${isViewOnce ? 'Ativo': 'Desativado'}
＊ ⌁ Bem vindo: ${isWelcome ? 'Ativo': 'Desativado'}
＊ ╰═══×
╰━━━ ~~`;
};