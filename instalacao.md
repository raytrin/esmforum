# Guia de Instalação e Execução Local

Este documento apresenta os passos necessários para configurar e executar localmente a stack da aplicação, composta pelo backend (`esmforum`) e frontend (`esmforum-react`).

## 1. Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Git**
- **Node.js** e **npm**
- **Python 3.11** (Obrigatório para compilação da dependência nativa `better-sqlite3` via `node-gyp`)

---

## 2. Configurando o Backend (`esmforum`)

O backend utiliza Node.js e requer a compilação do SQLite durante a instalação das dependências.

### 2.1. Clonando e Acessando o Repositório

```bash
git clone https://github.com/raytrin/esmforum.git
cd esmforum
```

### 2.2. Configurando o Python 3.11 para o npm

Como o `node-gyp` (utilizado pelo projeto) é incompatível com versões mais recentes do Python (como 3.12+ que removeram o módulo `distutils`), você deve forçar o npm a utilizar o Python 3.11.

Exporte o caminho do executável do Python 3.11 no seu terminal:

```bash
# O caminho pode variar conforme o seu sistema operacional ou gerenciador de pacotes (ex: Homebrew no macOS)
export npm_config_python=/usr/local/bin/python3.11
```

Verifique se a versão correta está sendo apontada:

```bash
$npm_config_python --version
# Saída esperada: Python 3.11.x
```

### 2.3. Instalando as Dependências e Executando

Com o Python configurado corretamente, instale os pacotes e inicie o servidor:

```bash
npm install
node server.js
```

O terminal exibirá `forum rodando em 5000`. O backend estará disponível em: `http://localhost:5000`

---

## 3. Configurando o Frontend (`esmforum-react`)
 
### 3.1. Clonando e Acessando o Repositório
 
Abra uma nova aba ou janela no terminal e clone o repositório do frontend:
 
```bash
git clone https://github.com/raytrin/esmforum-react.git
cd esmforum-react
```
 
### 3.2. Instalando as Dependências e Executando
 
```bash
npm install
npm start
```
 
O React iniciará o servidor de desenvolvimento. A aplicação estará acessível no navegador em: `http://localhost:3000`
 
---
 
## 4. Solução de Problemas (Troubleshooting)
 
| Problema / Mensagem | Causa e Solução |
|---|---|
| `ModuleNotFoundError: No module named 'distutils'` | **Causa:** O backend tentou compilar o `better-sqlite3` usando uma versão do Python incompatível (3.12+).<br>**Solução:** Instale o Python 3.11 e repita o passo 2.2, garantindo que a variável `npm_config_python` aponte para o executável correto antes de rodar `npm install`. |
| `Warning: React Hook React.useEffect has a missing dependency: 'id_pergunta'` (em `src/pages/Resposta.js`) | **Causa:** Aviso de linting padrão do ESLint no frontend alertando sobre o array de dependências do hook.<br>**Solução:** Nenhuma ação bloqueante é necessária. O warning não impede a compilação e a execução normal da aplicação. |
 