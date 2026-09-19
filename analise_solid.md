## Iteração 1: Princípios SOLID

### Tarefa 1: Análise SOLID no Código Existente

### Princípio da Responsabilidade Única no `modelo.js`
O arquivo `modelo.js` possui funções coesas que fazem apenas uma coisa. Por exemplo, a função `cadastrar_pergunta` tem como única responsabilidade montar os parâmetros e executar a query de inserção no banco.

```javascript
function cadastrar_pergunta(texto) {
  const params = [texto, 1];
  const result = bd.exec('INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?) RETURNING id_pergunta', params);
  return result.lastInsertRowid;
}
```

...

### Princípio da Inversão de Dependência no acesso ao banco de dados no `modelo.js`
O módulo permite a injeção da dependência do banco através da função reconfig_bd. Assim, é possível fazer testes usando mocks porque o modelo não fica preso ao banco.

```javascript
function reconfig_bd(mock_bd) {
  bd = mock_bd;
}
```

...

### Princípio da Responsabilidade Única entre o `modelo.js` e o `server.js`
Há uma separação de papéis entre o router e a camada de dados. Dessa forma, o server só lida com as requisições do http, e o modelo cuida da busca no banco de dados. 

---

## Oportunidade de melhoria

### Violação do Princípio da Inversão de Dependência no `server.js`
O arquivo de rotas está sendo declarado hardcoded no código, acoplando o módulo de dados ao server.js. A solução é passar o banco como parâmetro ou um container de injeção de dependência.

### Violação do Princípio da Responsabilidade Única no `server.js`
O arquivo atual concentra três responsabilidades: configurar os middlewares, mapear as rotas HTTP e inicializar o servidor de rede. A solução para aplicar o SRP é separar essas responsabilidades, fazendo com que o arquivo de rotas apenas configure e exporte a instância do Express (module.exports = app). Um arquivo de entrada principal e separado (como um index.js) ficaria responsável exclusivamente por chamar o método app.listen() para colocar o servidor no ar.
