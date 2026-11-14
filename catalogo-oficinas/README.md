# Catálogo de Oficinas

Avaliação Prática 01 — Desenvolvimento Back-end I (Pós-graduação em Desenvolvimento Fullstack).

Aplicação web com Node.js, Express (Express Generator), Handlebars e Bootstrap (instalação offline)
para manter um catálogo de oficinas de treinamento. Os registros ficam em memória durante a execução
do servidor (o catálogo começa vazio).

## Como executar

```
npm install
npm start
```

Acesse http://localhost:3000

## Rotas

| Método | Rota | Funcionalidade |
| --- | --- | --- |
| GET | `/` | Página principal (todas as oficinas + resumo) |
| GET | `/abertas` | Visualização das oficinas com inscrições abertas |
| GET | `/sobre` | Página Sobre |
| GET / POST | `/oficina/cria` | Cadastro de oficina |
| GET | `/oficina/consulta/:id_oficina` | Consulta de oficina |
| GET / POST | `/oficina/altera/:id_oficina` | Edição de oficina |
| GET | `/oficina/encerra/:id_oficina` | Encerra as inscrições |
| GET | `/oficina/reabre/:id_oficina` | Reabre as inscrições |
| GET | `/oficina/deleta/:id_oficina` | Exclusão (após confirmação na janela modal) |
| GET / POST | `/oficina/pesquisa` | Pesquisa por título |
