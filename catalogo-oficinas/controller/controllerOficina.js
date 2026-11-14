// importação do objeto que gerencia as oficinas na memória
const oficinas = require('../model/oficinaMemoria.js')

// Observação: nas funções que acessam uma oficina pelo ID, o bloco try/catch
// trata o caso de uma oficina inexistente (ex.: ID digitado na URL ou oficina já excluída),
// encaminhando o erro para a página de erro da aplicação (app.js).

// cria e já exporta a função que será responsável pelo formulário de cadastro (GET)
exports.cria_get = async function(req, res){
    var contexto = {
        titulo_pagina: "Nova Oficina",
        menu_cria: true,
    }

    // renderiza o arquivo dentro da pasta view
    res.render('criaOficina', contexto);
}

// cria e já exporta a função que será responsável por receber o cadastro (POST)
exports.cria_post = async function(req, res){
    // obtém as informações do formulário
    var titulo = req.body.titulo
    var responsavel = req.body.responsavel
    var descricao = req.body.descricao
    // todo dado recebido via formulário é string, então convertemos para número
    var carga_horaria = parseInt(req.body.carga_horaria)

    // cria a oficina (o ID é gerado e as inscrições começam abertas no model)
    await oficinas.cria(titulo, responsavel, descricao, carga_horaria);

    // redireciona para a página principal
    res.redirect('/');
}

// cria e já exporta a função que será responsável pela consulta da oficina
exports.consulta = async function(req, res, next){
    try {
        //informação passada como parâmetro na url
        var id = parseInt(req.params.id_oficina)
        var oficina = await oficinas.consulta(id);

        var contexto = {
            titulo_pagina: "Consulta de Oficina",
            id: oficina.id,
            titulo: oficina.titulo,
            responsavel: oficina.responsavel,
            descricao: oficina.descricao,
            carga_horaria: oficina.carga_horaria,
            inscricoes_abertas: oficina.inscricoes_abertas,
        }

        // renderiza o arquivo dentro da pasta view
        res.render('consultaOficina', contexto);
    } catch (erro) {
        next(erro);
    }
}

// cria e já exporta a função que será responsável pelo formulário de edição (GET)
exports.altera_get = async function(req, res, next){
    try {
        //informação passada como parâmetro na url
        var id = parseInt(req.params.id_oficina)
        var oficina = await oficinas.consulta(id);

        var contexto = {
            titulo_pagina: "Editar Oficina",
            id: oficina.id,
            titulo: oficina.titulo,
            responsavel: oficina.responsavel,
            descricao: oficina.descricao,
            carga_horaria: oficina.carga_horaria,
        }

        // renderiza o arquivo dentro da pasta view
        res.render('alteraOficina', contexto);
    } catch (erro) {
        next(erro);
    }
}

// cria e já exporta a função que será responsável por receber a edição (POST)
exports.altera_post = async function(req, res, next){
    try {
        //informação passada como parâmetro na url
        var id = parseInt(req.params.id_oficina)

        // obtém as informações do formulário
        var titulo = req.body.titulo
        var responsavel = req.body.responsavel
        var descricao = req.body.descricao
        var carga_horaria = parseInt(req.body.carga_horaria)

        // atualiza os dados da oficina, preservando o ID e a situação das inscrições
        await oficinas.atualiza(id, titulo, responsavel, descricao, carga_horaria);

        // redireciona para a página principal
        res.redirect('/');
    } catch (erro) {
        next(erro);
    }
}

// cria e já exporta a função que será responsável por encerrar as inscrições
exports.encerra = async function(req, res, next){
    try {
        var id = parseInt(req.params.id_oficina)

        // altera somente a situação para inscrições encerradas
        await oficinas.altera_inscricoes(id, false);

        // redireciona para a página principal
        res.redirect('/');
    } catch (erro) {
        next(erro);
    }
}

// cria e já exporta a função que será responsável por reabrir as inscrições
exports.reabre = async function(req, res, next){
    try {
        var id = parseInt(req.params.id_oficina)

        // altera somente a situação para inscrições abertas
        await oficinas.altera_inscricoes(id, true);

        // redireciona para a página principal
        res.redirect('/');
    } catch (erro) {
        next(erro);
    }
}

// cria e já exporta a função que será responsável pela exclusão da oficina
// (chamada pelo botão "Confirmar" da janela modal de exclusão)
exports.deleta = async function(req, res, next){
    try {
        //informação passada como parâmetro na url
        var id = parseInt(req.params.id_oficina)
        await oficinas.deleta(id);

        // redireciona para a página principal
        res.redirect('/');
    } catch (erro) {
        next(erro);
    }
}

// cria e já exporta a função que será responsável pela página de pesquisa (GET)
exports.pesquisa_get = async function(req, res){
    var contexto = {
        titulo_pagina: "Pesquisa de Oficinas",
        menu_pesquisa: true,
        pesquisa_realizada: false,
    }

    // renderiza o arquivo dentro da pasta view
    res.render('pesquisaOficina', contexto);
}

// cria e já exporta a função que será responsável por receber a pesquisa (POST)
exports.pesquisa_post = async function(req, res){
    // obtém o termo digitado no formulário
    var termo = req.body.termo
    var lista = await oficinas.lista()
    var resultado = []

    // lista as oficinas cujo título contém o termo, sem distinguir maiúsculas de minúsculas
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].titulo.toLowerCase().includes(termo.toLowerCase())) {
            resultado.push(lista[i])
        }
    }

    var contexto = {
        titulo_pagina: "Pesquisa de Oficinas",
        menu_pesquisa: true,
        pesquisa_realizada: true,
        termo: termo, // mantém o termo visível no campo de pesquisa
        resultado: resultado,
    }

    // usa a mesma página para exibir o formulário e o resultado
    res.render('pesquisaOficina', contexto);
}
