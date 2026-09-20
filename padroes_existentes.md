## Identificação de Padrões Existentes

Esta análise considera o código do backend já com a funcionalidade de votação implementada (`src/votacao.repository.js` e `src/votacao.service.js`).

---

### Padrão Repository - `VotacaoRepository`

O módulo `src/votacao.repository.js` isola todo o acesso a dados (queries SQL) relacionado à votação, escondendo os detalhes de persistência do resto da aplicação. Ele usa um único método genérico para os dois tipos de voto, parametrizado pelo nome da coluna:

```javascript
class VotacaoRepository {
  constructor(bd) {
    this.bd = bd;
  }

  atualizarVotos(id_pergunta, colunaVoto) {
    const query = `UPDATE perguntas SET ${colunaVoto} = coalesce(${colunaVoto}, 0) + 1 WHERE id_pergunta = ?`;
    return this.bd.exec(query, [id_pergunta]);
  }
}
```

Aplicado em: `src/votacao.repository.js`, instanciado em `server.js`.

O padrão Repository foi aplicado apenas para a votação. As perguntas e respostas em `modelo.js` continuam acessando o `bd` diretamente dentro das próprias funções (`get_pergunta`, `get_respostas`, `cadastrar_pergunta`, `cadastrar_resposta`), sem um repositório dedicado. Para ficar completo, seria necessário criar também um `PerguntaRepository` e um `RespostaRepository`.

---

### Padrão Singleton

O `bd_utils.js` funciona, na prática, como um singleton: como o Node.js guarda em cache o resultado de cada `require`, todo arquivo que faz `require('./bd/bd_utils.js')` recebe a mesma instância de conexão com o banco.

```javascript
var bd = require('./bd/bd_utils.js');
```

Aplicado em: `modelo.js` e `server.js`, que importam o mesmo módulo de banco.

É um Singleton do próprio Node, não foi implementado. Além disso, `reconfig_bd()` sobrescreve essa variável global durante os testes, o que funciona, mas é uma forma um pouco frágil de trocar a dependência. Seria melhor usar um container de injeção de dependência.

---

### Padrão Chain of Responsibility (middlewares do Express)

O Express já implementa esse padrão internamente, e o projeto usa isso ao declarar um middleware global:

```javascript
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

Aplicado em: `server.js`, antes da definição das rotas.

o projeto usa um middleware manual de 6 linhas para injetar os cabeçalhos de CORS. Uma simplificação de design seria adotar o pacote oficial `cors`, reduzindo esse bloco para apenas uma linha: `app.use(cors());`.

Hoje existe só esse middleware. Validação de entrada, tratamento de erros e log de requisições ainda ficam misturados dentro dos handlers das rotas, cada um desses poderia virar seu próprio middleware.

---

### Padrão Service Layer (uma aproximação de Facade) em `VotacaoService`

`VotacaoService` concentra a regra de negócio da votação, ou seja, validar o tipo do voto e traduzi-lo para o nome da coluna do banco e expõe um único método, `registrarVoto`, para o `server.js` usar, escondendo o repositório por trás.

```javascript
class VotacaoService {
  constructor(repository) {
    this.repository = repository;
    this.estrategiasDeVoto = {
      'up': 'upvotes',
      'down': 'downvotes'
    };
  }

  registrarVoto(id_pergunta, tipo) {
    const colunaBD = this.estrategiasDeVoto[tipo];
    if (!colunaBD) throw new Error("Tipo de voto inválido. Use 'up' ou 'down'.");
    return this.repository.atualizarVotos(id_pergunta, colunaBD);
  }
}
```

Aplicado em: `src/votacao.service.js`, usado em `server.js`.

Não é um Facade "clássico" do GoF, que normalmente simplifica o acesso a vários subsistemas complexos ao mesmo tempo, mas faz algo parecido, dando uma interface simples pra quem consome (`server.js`) sem que ele precise conhecer o repositório.
