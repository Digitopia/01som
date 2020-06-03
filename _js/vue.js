let i18n
let vue

window.addEventListener("load", () => {

    const messages = {
        pt: {
            session: "Jogo",
            sessions: "Jogos e Recursos",
            sessionNames: [
                "Ritmo",
                "Melodia",
                "Sequenciador",
                "Notação",
                "Canção",
                "Árvore",
                "Atividades",
                "Manual",
                "Sobre"
            ],
            sheet: "Ficha",
            worksheetNames: [
                "Robô",
                "Ciclo",
                "Ritmo",
                "Melodia",
                "Canção"
            ],
            contact: "Contacto",
            intro: {
                p1: "O 0 + 1 = SOM é um projeto educativo que consiste num ciclo de oficinas realizadas em contexto escolar, dirigido aos alunos do 1º CEB do concelho de Braga, com o objetivo de os sensibilizar para as novas tecnologias aplicadas à arte.",
                p2: "Nestas oficinas os alunos utilizam jogos musicais online e gratuitos, por nós desenvolvidos, que podem encontrar nas ligações abaixo.",
            },
            students: {
                p1: "Este é o espaço onde podem ver e descarregar os cinco desafios que desenhámos para vocês.",
                p2: "Os mesmos desafios também fazem parte do manual, um recurso importante para os pais e os professores.",
            },
            session1: "Ritmo",
            session2: "Melodia",
            session3: "Sequenciador",
            session4: "Notação",
            session5: "Canção",
            session6: "Árvore",
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
            session: "Game",
            sessions: "Games and Resources",
            sheet: "Ficha",
            sessionNames: [
                "Rhythm",
                "Melody",
                "Sequencer",
                "Notation",
                "Song",
                "Tree",
                "Activities",
                "Manual",
                "About"
            ],
            worksheetNames: [
                "Robot",
                "Cycle",
                "Rhythm",
                "Melody",
                "Song"
            ],
            contact: "Contact",
            intro: {
                p1: "0 + 1 = SOM is an educational program consisting on a workshop cycle, in a school context. The sessions take place in Braga's elementary schools, with the aim of exploring the relationship between technology and art.",
                p2: "These workshops use free and online musical games developed by us, that you can find in the links below.",
            },
            students: {
                p1: "Here you can find the five worksheets we produced for different activities related to 0 + 1 = SOM.",
                p2: "These are also included in the manual, for parents and teachers.",
            },
            session1: "Rhythm",
            session2: "Melody",
            session3: "Sequencer",
            session4: "Notation",
            session5: "Song",
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
                { id: 4, img: "_assets/images/menu/4.png", url: "S5" }, //TODO: change link to S4
                { id: 5, img: "_assets/images/menu/5.png", url: "/", disabled: true },
                { id: 6, img: "_assets/images/menu/6.png", url: "arvore" },
            ],
            extras: [
                { id: 7, img: "_assets/images/menu/7.png", url: "atividades"},
                { id: 8, img: "_assets/images/menu/8.png", url: "manual"},
                { id: 9, img: "_assets/images/menu/9.png", url: "sobre", disabled: true}
            ],
            worksheets: [
                { id: 1, img: "../_assets/images/fichas/1.png", url: "01_Robo.pdf" },
                { id: 2, img: "../_assets/images/fichas/2.png", url: "02_Ciclo.pdf" },
                { id: 3, img: "../_assets/images/fichas/3.png", url: "03_Ritmo.pdf" },
                { id: 4, img: "../_assets/images/fichas/4.png", url: "04_Melodia.pdf" }, //TODO: change link to S4
                { id: 5, img: "../_assets/images/fichas/5.png", url: "05_Cancao.pdf" },
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
        },
    })

})
