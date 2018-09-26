let i18n
let vue

window.addEventListener("load", () => {

    const messages = {
        pt: {
            session: "Sessão",
            sessions: "Sessões",
            sessionNames: [
                "Ritmo",
                "Ritmo e Melodia",
                "Sequenciador",
                "Canção",
                "Notação",
                "Acústica",
                "Teoria"
            ],
            contact: "Contacto",
            intro: {
                p1: "0 + 1 = SOM consiste num ciclo de workshops realizados em contexto escolar, nas escolas primárias do Município de Braga, que visa expor alunos do primeiro ciclo às novas tecnologias aplicadas à arte.",
                p2: "Os workshops resultarão em vários jogos e softwares de criação musical originais criados e pensados pelos alunos.",
            },
            session1: "Ritmo",
            session2: "Ritmo e Melodia",
            session3: "Sequenciador",
            session4: "Canção",
            session5: "Notação",
            session6: "Acústica",
            session7: "Teoria",
            soon: "(disponível brevemente)",
            help: {
                circle: "Clica nos círculos pequenos para escolher o som - uma vez para o azul, duas vezes para o verde, três vezes para o vermelho, quatro vezes para o branco. Clica nos botões de baixo para escolher o andamento.",
                session4: "Clica os números para decidir se o instrumento toca.",
                session5: "Clica nas figuras ou nos números para mudar o ritmo. Tenta tocá-lo e, se precisares de ajuda, usa o botão Play. Ajusta a velocidade no controlador à esquerda.",
            },
            tracks: [
                "Guit 1",
                "Guit 2",
                "Guit 3",
                "Baixo",
                "Piano",
                "Cordas",
                "Bat 1",
                "Bat 2",
                "Bat 3"
            ]
        },
        en: {
            session: "Session",
            sessions: "Sessions",
            sessionNames: [
                "Rhythm",
                "Rhythm and Melody",
                "Sequencer",
                "Song",
                "Notation",
                "Acoustics",
                "Theory"
            ],
            contact: "Contact",
            intro: {
                p1: "0 + 1 = SOM consists in a series of workshops conducted in school context, in the primary school of the municipality of Braga (in nothern Portugal), that aim to expose the students of age 6 to 10 to the new techonologies applied to art.",
                p2: "The workshops result in different kind of games and software of musical creation original by the students.",
            },
            session1: "Rhythm",
            session2: "Rhythm and Melody",
            session3: "Sequencer",
            session4: "Song",
            session5: "Notation",
            session6: "Acoustics",
            session7: "Theory",
            soon: "(available soon)",
            help: {
                circle: "Click the small circles to choose the sound - once for blue, twice for green, three times for red and four times for white. Click the buttons at the bottom to choose the tempo.",
                session4: "Click the numbers to decide if the instrument plays.",
                session5: "Click the musical figures or the numbers to change the rhythm. Try to play it and, if you need help, use the Play button. Adjust the tempo on the slider to the left.",
            },
            tracks: [
                "Guit 1",
                "Guit 2",
                "Guit 3",
                "Bass",
                "Piano",
                "Strings",
                "Drums 1",
                "Drums 2",
                "Drums 3"
            ]
        }
    }

    // Get current locale
    let cookie = Cookies.get("locale")
    let locale = "pt"
    if (cookie) locale = cookie

    // Initiate locale
    i18n = new VueI18n({ locale: locale, messages })

    // Create a Vue instance with `i18n` option
    vue = new Vue({
        i18n,
        el: "#app",
        data: {
            sessions: [
                { id: 1, img: "_assets/images/menu/1.png", url: "S1" },
                { id: 2, img: "_assets/images/menu/2.png", url: "S2" },
                { id: 3, img: "_assets/images/menu/3.png", url: "S3" },
                { id: 4, img: "_assets/images/menu/4.png", url: "S4" },
                { id: 5, img: "_assets/images/menu/5.png", url: "S5" },
                { id: 6, img: "_assets/images/menu/6.png", url: "/", disabled: true },
                { id: 7, img: "_assets/images/menu/7.png", url: "/", disabled: true }
            ],
            buttons: "",
            tracks: ""
        },
        methods: {
            changeLocale: loc => {
                i18n.locale = loc
                Cookies.set("locale", loc, { expires: 365 })
            },
            click: function(bpm) { app.bpm = bpm } // NOTE: this is a small hack.. shouldn't be using app here..
        }
    })

})
