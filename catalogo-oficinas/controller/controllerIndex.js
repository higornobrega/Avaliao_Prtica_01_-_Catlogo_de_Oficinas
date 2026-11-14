// importação do objeto que gerencia as oficinas na memória
const oficinas = require('../model/oficinaMemoria.js')

// calcula os indicadores do resumo considerando todas as oficinas do catálogo
function calcula_resumo(lista) {
    var resumo = {
        total: lista.length,
        abertas: 0,
        encerradas: 0,
        carga_horaria_abertas: 0,
    }

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].inscricoes_abertas) {
            resumo.abertas++
            resumo.carga_horaria_abertas = resumo.carga_horaria_abertas + lista[i].carga_horaria
        } else {
            resumo.encerradas++
        }
    }

    return resumo
}

// retorna somente as oficinas com inscrições abertas
function filtra_abertas(lista) {
    var abertas = []

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].inscricoes_abertas) abertas.push(lista[i])
    }

    return abertas
}

// cria e já exporta a função que será responsável pela tela principal (todas as oficinas)
exports.tela_principal = async function(req, res){
    var lista = await oficinas.lista()

    var contexto = {
        titulo_pagina: "Catálogo de Oficinas",
        menu_inicio: true,
        visualizacao_todas: true,
        visualizacao_abertas: false,
        resumo: calcula_resumo(lista),
        oficinas: lista,
    }

    // renderiza o arquivo index.hbs, dentro da pasta view
    res.render('index', contexto);
}

// cria e já exporta a função que será responsável pela visualização das inscrições abertas
exports.inscricoes_abertas = async function(req, res){
    var lista = await oficinas.lista()

    var contexto = {
        titulo_pagina: "Catálogo de Oficinas - Inscrições Abertas",
        menu_inicio: true,
        visualizacao_todas: false,
        visualizacao_abertas: true,
        // o resumo sempre considera o catálogo completo
        resumo: calcula_resumo(lista),
        oficinas: filtra_abertas(lista),
    }

    // reutiliza o mesmo template e a mesma tabela da tela principal
    res.render('index', contexto);
}

// cria e já exporta a função que será responsável pela página Sobre
exports.sobre = async function(req, res){
    var contexto = {
        titulo_pagina: "Sobre o Catálogo",
        menu_sobre: true,
    }

    // renderiza o arquivo sobre.hbs, dentro da pasta view
    res.render('sobre', contexto);
}
