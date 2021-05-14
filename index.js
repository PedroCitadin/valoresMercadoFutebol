const express = require("express")
const app = express()
const axios = require('axios').default
const parser = require('node-html-parser').parse
const porta = process.env.PORT || 8080
const dados = require("./api/dados.json")



app.use("/topvalores", function (req, res) {
    var jogadores = []
    const sq = (req.query).liga
    if (verificaFiltro(sq)) {
        const url = retornaURL(sq)
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

function retornaURL(qs){
    if(qs=="brasileirao"){
        return dados.campeonato[0].local
    }else if(qs=="premierleague"){
        return dados.campeonato[1].local
    }else if(qs=="laliga"){
        return dados.campeonato[2].local
    }else if(qs=="ligue1"){
        return dados.campeonato[3].local
    }else if(qs=="seriea"){
        return dados.campeonato[4].local
    }else if(qs=="bundesliga"){
        return dados.campeonato[5].local
    }
}