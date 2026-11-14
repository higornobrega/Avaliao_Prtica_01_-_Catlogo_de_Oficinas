// Neste arquivo fazemos o gerenciamento das oficinas na memória do computador.
// Cada oficina é representada como um objeto Javascript (notação de chaves):
// { id, titulo, responsavel, descricao, carga_horaria, inscricoes_abertas }

const lista_oficinas = [] // vetor de objetos oficina, indexado pelo ID da oficina
let proximo_id = 1 // próximo ID a ser gerado no cadastro de uma oficina

class OficinaMemoria {

    // métodos assíncronos para simular os métodos de um ORM
    async cria(titulo, responsavel, descricao, carga_horaria) {
        // o ID é gerado pela aplicação e nunca se repete
        var id = proximo_id
        proximo_id++

        lista_oficinas[id] = {
            id: id,
            titulo: titulo,
            responsavel: responsavel,
            descricao: descricao,
            carga_horaria: carga_horaria,
            inscricoes_abertas: true, // toda oficina nova começa com inscrições abertas
        }
        return lista_oficinas[id]
    }
    async atualiza(id, titulo, responsavel, descricao, carga_horaria) {
        var oficina = await this.consulta(id)

        // altera apenas os campos do formulário, preservando o ID e a situação das inscrições
        oficina.titulo = titulo
        oficina.responsavel = responsavel
        oficina.descricao = descricao
        oficina.carga_horaria = carga_horaria
        return oficina
    }
    async altera_inscricoes(id, inscricoes_abertas) {
        var oficina = await this.consulta(id)

        // altera somente a situação das inscrições (true = abertas, false = encerradas)
        oficina.inscricoes_abertas = inscricoes_abertas
        return oficina
    }
    async consulta(id) {
        if (lista_oficinas[id]) return lista_oficinas[id];
        else throw new Error(`Oficina com o ID ${id} não existe`);
    }
    async deleta(id) {
        if (lista_oficinas[id]) {
            delete lista_oficinas[id]
        } else throw new Error(`Oficina com o ID ${id} não existe`);
    }
    async lista() {
        return Object.values(lista_oficinas)
    }
}

// cria um objeto do tipo OficinaMemoria que será utilizado para gerenciar as oficinas
var oficinas = new OficinaMemoria()

module.exports = oficinas
