# Histórias de Usuário e Priorização

## 1. Histórias de Usuário

### História 1: Perfil de Usuário com Histórico
**Como** usuário do fórum,  
**Eu quero** ter um perfil para gerenciar minhas interações,  
**Para** conseguir acompanhar e acessar facilmente todas as minhas perguntas e respostas centralizadas em um só lugar.

**Critérios de Aceitação:**
- [ ] O sistema deve exibir uma página de perfil público contendo username e imagem de perfil.
- [ ] O perfil deve conter uma área privada (dashboard) listando o histórico de perguntas feitas e respostas enviadas pelo usuário.
- [ ] Todas as perguntas e respostas exibidas no fórum devem exibir o username do autor, servindo como link para o seu perfil público.


### História 2: Busca de Perguntas por Palavra-chave
**Como** usuário do fórum,  
**Eu quero** buscar por tópicos específicos usando uma barra de pesquisa,  
**Para** encontrar rapidamente dúvidas e respostas sem precisar navegar manualmente por todas as páginas do fórum.

**Critérios de Aceitação:**
- [ ] A página inicial deve exibir um campo de texto em formato de barra de busca visível.
- [ ] O sistema deve retornar uma lista de perguntas cujos títulos ou conteúdos contenham a palavra-chave exata ou parcial digitada.
- [ ] Caso não haja correspondência no banco de dados, o sistema deve exibir uma mensagem amigável informando que a pesquisa não encontrou nenhum tópico.


### História 3: Categorização de Perguntas
**Como** usuário do fórum,  
**Eu quero** visualizar e filtrar perguntas por categorias,  
**Para** explorar temas específicos do meu interesse de forma mais organizada.

**Critérios de Aceitação:**
- [ ] O sistema deve fornecer um menu de navegação listando as categorias disponíveis.
- [ ] Ao criar uma pergunta, o usuário deve ser capaz de atribuir pelo menos uma categoria/tag que reflita o tema (ex: JavaScript, Python, Banco de Dados).
- [ ] Ao clicar em uma categoria no menu, o sistema deve filtrar a listagem da página inicial para exibir apenas as perguntas vinculadas àquele tema.


---

## 2. Priorização

**Ordem de Prioridade:**
1. Perfil de usuário com histórico de perguntas e respostas
2. Busca de perguntas por palavra-chave
3. Categorização de perguntas (tags)

**Justificativa:**
A ordem de prioridade foi estabelecida considerando a jornada principal do usuário e a entrega de valor em um sistema de fórum. O objetivo central da plataforma é permitir que as pessoas tenham suas dúvidas respondidas e contribuam com a comunidade de forma amigável e rastreável. Portanto, o primeiro passo lógico (Prioridade 1) é a identificação via perfil, permitindo a autoria e o gerenciamento do próprio conteúdo.

A busca por palavra-chave (Prioridade 2) vem em seguida como um recurso fundamental de usabilidade, pois evita a duplicação de perguntas e permite que o usuário encontre soluções de forma rápida. 

Por fim, a categorização (Prioridade 3) funciona como um refinamento para a organização dos tópicos, mas não é estritamente imprescindível para o funcionamento básico do sistema no primeiro momento, podendo ser implementada após a consolidação da identidade e da busca.