# Práticas de Extreme Programming 

## Análise do Backend (`server.js`)

A análise de Design Simples (YAGNI) foi aplicada ao arquivo `server.js`, visto que não existe o diretório `routes/` mencionado.

### 1. Aspectos que seguem o Princípio YAGNI (You Aren't Gonna Need It)

O código atual aplica o conceito de não adicionar complexidade prematura de duas formas:

* **Ausência de Injeção de Dependência (Acoplamento Direto):** O arquivo `server.js` importa o banco diretamente (`const modelo = require('./modelo.js')`). Em sistemas escaláveis, usaríamos Injeção de Dependência para facilitar testes unitários com *mocks* ou trocar o banco. Pelo princípio YAGNI, como o projeto nasceu apenas com um banco SQLite simples, o desenvolvedor evitou criar *containers* de dependência desnecessários para este primeiro momento (embora isso deva ser refatorado no futuro para seguir o SOLID).
* **Arquitetura Direta sem Middlewares Complexos:** O sistema atual não cria schemas de validação para os payloads, nem utiliza roteadores externos (`express.Router()`). Ele faz apenas o estritamente necessário para persistir a pergunta e a resposta.

### 2. Oportunidades de Simplificação e Melhoria

Apesar de simples, o código possui falhas de design e oportunidades de refatoração:

- **Correção do Escopo do Try/Catch:**
Na rota `GET /respostas/:id_pergunta`, a busca no banco de dados está acontecendo fora do bloco `try`. Se o banco falhar, o servidor vai quebrar em vez de retornar o erro 500 do `catch`. Todo o acesso a dados (`modelo.get_pergunta`) deve estar protegido para dentro do bloco `try`.

- **Tratamento de Erros Genérico e Ausência de Logs Estruturados:**
Atualmente, qualquer falha cai em um bloco `catch(erro)` que devolve um `Status 500` genérico. Isso mascara erros de negócio. A melhoria seria padronizar as respostas de erro e mapear os status HTTP corretamente (ex: retornar `404 Not Found` caso o `id_pergunta` não exista, ou `400 Bad Request` se o schema do payload estiver inválido), além de implementar arquivos de log estruturados para facilitar o monitoramento do servidor.

- **Simplificação do CORS:**
O projeto utiliza um *middleware* manual de 6 linhas para injetar cabeçalhos de CORS. Uma simplificação de design seria adotar o pacote oficial `cors`, reduzindo esse bloco para apenas uma linha: `app.use(cors());`.