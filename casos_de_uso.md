## Tarefa 2: Caso de Uso

### Caso de Uso: Buscar Perguntas por Palavra-chave

**Atores:** Usuário do fórum (logado ou visitante)

**Pré-condições:**
- O sistema está acessível e operando normalmente.
- O banco de dados contém perguntas cadastradas.
- A página inicial está carregada com a barra de busca visível.

**Fluxo Principal:**
1. O usuário acessa a página inicial do fórum.
2. O sistema exibe o campo de busca de palavras-chave.
3. O usuário digita um termo de pesquisa e aciona a busca (pressionando Enter ou no botão de pesquisa).
4. O sistema recebe o termo e realiza uma consulta no banco de dados, buscando correspondências nos títulos e conteúdos das perguntas.
5. O sistema encontra uma ou mais perguntas que correspondem ao termo buscado.
6. O sistema atualiza a interface exibindo apenas a lista de perguntas filtradas pelos resultados da busca.

**Fluxo Alternativo 1: Nenhum resultado encontrado**
- 4a. O sistema recebe o termo e realiza a consulta no banco de dados.
- 5a. O sistema não encontra nenhuma pergunta que corresponda à palavra-chave.
- 6a. O sistema exibe uma mensagem amigável: "Sua pesquisa não corresponde a nenhum tópico".
- 7a. O sistema mantém a barra de busca disponível para que o usuário possa tentar um novo termo.

**Pós-condições:**
- O usuário visualiza os resultados da sua busca ou recebe um feedback claro de que o conteúdo não existe, permanecendo na página pronto para realizar uma nova ação.