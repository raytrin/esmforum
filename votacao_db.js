const bd = require('./bd/bd_utils.js');

try {
  bd.exec("ALTER TABLE perguntas ADD COLUMN upvotes INTEGER DEFAULT 0", []);
  bd.exec("ALTER TABLE perguntas ADD COLUMN downvotes INTEGER DEFAULT 0", []);
  console.log("Banco de dados atualizado com sucesso!");
} catch (erro) {
  console.log("Aviso (pode ignorar se as colunas já existirem):", erro.message);
}