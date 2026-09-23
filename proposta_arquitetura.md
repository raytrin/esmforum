## Aplicação do Padrão MVC no Backend

O padrão MVC pode ser usado para estruturar o fluxo de dados e DTOs (Data Transfer Objects) porque ele estabelece uma separação clara de responsabilidades, isolando a lógica de negócio da interface do usuário. Esse padrão será aplicado em: **Registro de Voto** e **Busca de Perguntas por Palavra-Chave**.

- Os **Models (Modelos / Persistência)** são representados pelas classes de Repositório. Eles são responsáveis por encapsular a estrutura dos dados e a lógica de entrada e saída (I/O), sendo a única camada que possui conhecimento direto sobre os detalhes do SQLite. Por exemplo, o `VotacaoRepository`, que executa as instruções de `UPDATE` nas colunas de *upvotes* e *downvotes*, e um futuro `BuscaRepository`, responsável por realizar as consultas através da query `SELECT * FROM perguntas WHERE texto LIKE ?`.

- Em seguida, as **Views (Serializers / Formatação JSON)**. Como a nossa API não possui interface gráfica, a View assume o papel de camada de serialização. A sua função é ditar exatamente como o JSON será formatado antes de ser entregue ao cliente, garantindo a padronização das respostas e a ocultação de chaves internas da base de dados. Por exemplos, o `VotoSerializer.toJSON(resultado)`, que estrutura a mensagem de sucesso, e o `BuscaSerializer.toJSON(perguntas)`, que recebe a matriz de resultados brutos do repositório e devolve um JSON mapeando chaves internas (como `id_pergunta` para `idPergunta`), deixando-o pronto para o frontend.

Por fim, os **Controllers (Controladores de Rotas)** atuam na orquestração do protocolo HTTP. O Controller não deve conter regras de negócio. A sua responsabilidade é puramente receber a requisição, acionar o Repositório (Model) adequado para lidar com os dados, repassar esse retorno bruto para a View formatar e devolver a resposta HTTP ao cliente. Esse fluxo é aplicado em controladores como `VotacaoController.votar` e `BuscaController.buscar`.

**Diagrama MVC e Exemplo de Fluxo do Busca por Palavra-Chave:**

O fluxo abaixo demonstra o ciclo de vida de uma requisição de busca passando pelos três componentes do MVC.

```mermaid
sequenceDiagram
    participant Cliente
    participant Controller as BuscaController
    participant Model as BuscaModel
    participant View as BuscaSerializer

    Cliente->>Controller: GET /busca?q=banco
    Note over Controller: 1. Extrai parâmetro
    Controller->>Model: buscar("banco")
    Note over Model: 2. Consulta SQLite
    Model-->>Controller: dados_brutos
    Controller->>View: formatar(dados_brutos)
    Note over View: 3. Converte para DTO
    View-->>Controller: json_formatado
    Controller-->>Cliente: HTTP 200 (JSON)