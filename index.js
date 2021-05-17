const express = require("express")
const app = express()
const axios = require('axios').default
const parser = require('node-html-parser').parse
const porta = process.env.PORT || 8080
const dados = require("./api/dados.json")



app.use("/topjogadores", function (req, res) {
    var jogadores = []
    const sq = (req.query).liga
    if (verificaFiltro(sq)) {
        const url = retornaURL(sq)
        if(url == false){
            res.send("Liga não encontrada!")
        }else{
        var requisicao = axios.get(url)
        requisicao.then(function (resposta) {
            var root = parser(resposta.data)
            var rt = root.querySelectorAll(".items")[0]['childNodes'][3]['childNodes']
            var r2 = []
            for (let i = 0; i < rt.length; i++) {
                if (i % 2 == 0) {

                } else {
                    r2.push(rt[i])
                }
            }
            for (let i = 0; i < r2.length; i++) {
                var nomep = {
                    nome: r2[i]['childNodes'][2]['childNodes'][1]['childNodes'][1]['childNodes'][3]['childNodes'][1]['_attrs']['title'],
                    posicao: r2[i]['childNodes'][2]['childNodes'][1]['childNodes'][3]['childNodes'][1]['childNodes'][0]['rawText'],
                    idade: r2[i]['childNodes'][4]['childNodes'][0]['rawText'],
                    nacionalidade: r2[i]['childNodes'][3]['childNodes'][0]['_attrs']['alt'],
                    clube: r2[i]['childNodes'][5]['childNodes'][0]['childNodes'][0]["_attrs"]['alt'],
                    valor_mercado: r2[i]['childNodes'][6]['childNodes'][0]['childNodes'][0]['rawText'],
                    url_imagem: r2[i]['childNodes'][2]['childNodes'][1]['childNodes'][1]['childNodes'][1]['childNodes'][1]['_attrs']['src']
                }
                jogadores.push(nomep)
            }

            res.send(jogadores)












        })

    }



    } else {
        const url = "https://www.transfermarkt.com.br/spieler-statistik/wertvollstespieler/marktwertetop"
        var requisicao = axios.get(url)
        requisicao.then(function (resposta) {
            var root = parser(resposta.data)
            var rt = root.querySelectorAll(".items")[0]['childNodes'][3]['childNodes']
            var r2 = []
            for (let i = 0; i < rt.length; i++) {
                if (i % 2 == 0) {

                } else {
                    r2.push(rt[i])
                }
            }

            for (let i = 0; i < r2.length; i++) {
                var nomep = {
                    nome: r2[i]['childNodes'][2]['childNodes'][0]['childNodes'][0]['childNodes'][0]['childNodes'][0]['childNodes'][0]['_attrs']['alt'],
                    posicao: r2[i]['childNodes'][2]['childNodes'][0]['childNodes'][1]['childNodes'][0]['childNodes'][0]['rawText'],
                    idade: r2[i]['childNodes'][3]['childNodes'][0]['rawText'],
                    nacionalidade: r2[i]['childNodes'][4]['childNodes'][0]['_attrs']['alt'],
                    clube: r2[i]['childNodes'][5]['childNodes'][0]['childNodes'][0]['_attrs']['alt'],
                    valor_mercado: r2[i]['childNodes'][6]['childNodes'][0]['childNodes'][0]['rawText'],
                    url_imagem: r2[i]['childNodes'][2]['childNodes'][0]['childNodes'][0]['childNodes'][0]['childNodes'][0]['childNodes'][0]['_attrs']['src']
                }
                jogadores.push(nomep)
            }

            res.send(jogadores)










        })









    }

})
app.use("/topclubes", function (req, res) {
    var clubes = []
    const sq = (req.query).confederacao
    
    if (verificaFiltro(sq)) {
    const url = retornaURLFed(sq)
    if(url == false){
        res.send("Confederação não encontrada!")
    }else{
    var requisicao = axios.get(url)
        requisicao.then(function (resposta) {
            var root = parser(resposta.data)
            var rt = root.querySelectorAll('.items')[0]['childNodes'][3]['childNodes']
            var r2 = []
            for (let i = 0; i < rt.length; i++) {
                if (i % 2 == 0) {

                } else {
                    r2.push(rt[i])
                }
            }

            for (let i = 0; i < r2.length; i++) {
                var nomep = {
                    nome: r2[i]['childNodes'][2]['childNodes'][0]['childNodes'][0]['_attrs']['alt'],
                    pais: r2[i]['childNodes'][4]['childNodes'][0]['_attrs']['alt'],
                    liga: r2[i]['childNodes'][4]['childNodes'][2]['_attrs']['title'],
                    valor_mercado: r2[i]['childNodes'][5]['childNodes'][0]['childNodes'][0]['rawText'],
                    url_imagem: r2[i]['childNodes'][2]['childNodes'][0]['childNodes'][0]['_attrs']['src']
                   
                }
                clubes.push(nomep)
            }
           res.send(clubes)


        })
    }

    } else {
        const url = dados.confederacoes[0].local
        var requisicao = axios.get(url)
        requisicao.then(function (resposta) {
            var root = parser(resposta.data)
            var rt = root.querySelectorAll('.items')[0]['childNodes'][3]['childNodes']
            var r2 = []
            for (let i = 0; i < rt.length; i++) {
                if (i % 2 == 0) {

                } else {
                    r2.push(rt[i])
                }
            }

            for (let i = 0; i < r2.length; i++) {
                var nomep = {
                    nome: r2[i]['childNodes'][2]['childNodes'][0]['childNodes'][0]['_attrs']['alt'],
                    pais: r2[i]['childNodes'][4]['childNodes'][0]['_attrs']['alt'],
                    liga: r2[i]['childNodes'][4]['childNodes'][2]['_attrs']['title'],
                    valor_mercado: r2[i]['childNodes'][5]['childNodes'][0]['childNodes'][0]['rawText'],
                    url_imagem: r2[i]['childNodes'][2]['childNodes'][0]['childNodes'][0]['_attrs']['src']
                   
                }
                clubes.push(nomep)
            }
           res.send(clubes)


        })
    }


})


app.use("/autor", function(req, res){
    const dados = require("./api/info.json")
    res.send(dados)
})


app.listen(porta, function () {
    console.log(porta)
})




function verificaFiltro(qs) {
    if (qs == undefined) {
        return false
    } else {
        return true
    }

}

function retornaURL(qs) {
    if (qs.toUpperCase() == "brasileirao".toUpperCase()) {
        return dados.campeonato[0].local
    } else if (qs.toUpperCase() == "premierleague".toUpperCase()) {
        return dados.campeonato[1].local
    } else if (qs.toUpperCase() == "laliga".toUpperCase()) {
        return dados.campeonato[2].local
    } else if (qs.toUpperCase()== "ligue1".toUpperCase()) {
        return dados.campeonato[3].local
    } else if (qs.toUpperCase() == "seriea".toUpperCase()) {
        return dados.campeonato[4].local
    } else if (qs.toUpperCase() == "bundesliga".toUpperCase()) {
        return dados.campeonato[5].local
    }else{
        return false
    }
}

function retornaURLFed(qs){
    for(let i = 0; i<dados.confederacoes.length; i++){
        if(qs.toUpperCase()==dados.confederacoes[i].nome.toUpperCase()){
            return dados.confederacoes[i].local 
        }
    }
    return false
}