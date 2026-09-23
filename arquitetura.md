# Análise Arquitetural 

O sistema ESM Forum segue o estilo **Cliente-Servidor Desacoplado**:

- **Frontend (Cliente):** Aplicação Web executada na porta `3000`, responsável pela interface do usuário e captura de interações.
- **Backend (Servidor API):** Monolito Node.js executado na porta `5000` (`server.js`), fornecendo os endpoints REST.

A comunicação entre o cliente (porta 3000) e o backend (porta 5000) ocorre exclusivamente via HTTP/JSON, exigindo a habilitação de CORS no servidor para permitir chamadas cross-origin.

Internamente, o backend possui uma arquitetura de código Híbrida:
- **Módulo Legado (Duas Camadas):** As rotas de perguntas e respostas (`server.js`) acessam diretamente o `modelo.js`, que mistura validação de negócio e queries SQL sem separação clara.
- **Módulo Modernizado (Três Camadas):** A rota de votação foi isolada com separação estrita de responsabilidades (`server.js` -> `VotacaoService` -> `VotacaoRepository`).

## Diagrama

```mermaid
graph TD
    subgraph "Navegador / Cliente (Porta 3000)"
        Front[Frontend Web / HTML + JS]
    end

    Front -- "Requisições HTTP / JSON (CORS)" --> ServerJS
    
    subgraph "Backend Node.js API (Porta 5000)"
        direction TB
        ServerJS[server.js - Roteador Express]
        
        ServerJS -- "Chamada Direta" --> ModeloJS[modelo.js - Regra + Banco]
        ModeloJS -- "SQL Direto" --> BDUtils[bd_utils.js - Conexão SQLite]
       
        ServerJS -- "Delegar" --> VotacaoService[VotacaoService - Regra de Negócio]
        VotacaoService -- "Injeção" --> VotacaoRepo[VotacaoRepository - Persistência]
        VotacaoRepo -- "Query Parametrizada" --> BDUtils
    end
    
    BDUtils -- "I/O" --> SQLite[(Banco de Dados SQLite)]
    
    classDef legado fill:#f9d0c4,stroke:#e06666,stroke-width:2px,color:#000000;
    classDef refatorado fill:#d9ead3,stroke:#93c47d,stroke-width:2px,color:#000000;
    classDef padrao fill:#f8f9fa,stroke:#adb5bd,stroke-width:2px,color:#000000;
    
    class Front,ServerJS,BDUtils,SQLite padrao;
    class ModeloJS legado;
    class VotacaoService,VotacaoRepo refatorado;
```