## Implementação com SOLID

**Funcionalidade Implementada:** Sistema de Votação em Perguntas (Upvote/Downvote)
**Escopo da Entrega:** Implementação restrita exclusivamente à arquitetura do backend.

A funcionalidade permite que os usuários enviem um voto do tipo "up" (positivo) ou "down" (negativo) para uma pergunta específica. A implementação respeita os princípios SOLID, conforme detalhado abaixo.

### 1. Single Responsibility Principle (SRP)c
**Como foi aplicado:** As responsabilidades foram separadas tanto de forma lógica quanto física, com a criação dos diretórios `src/repositories/` e `src/services/` para evitar o acoplamento no arquivo raiz.
- O módulo `VotacaoRepository` lida exclusivamente com a persistência de dados (queries SQL).
- O módulo`VotacaoService` lida exclusivamente com a regra de negócio (validação do tipo de voto).
- O `server.js` lida apenas com a requisição e resposta HTTP.
