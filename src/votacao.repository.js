class VotacaoRepository {
  constructor(bd) {
    this.bd = bd;
  }

  atualizarVotos(id_pergunta, colunaVoto) {
    const query = `UPDATE perguntas SET ${colunaVoto} = coalesce(${colunaVoto}, 0) + 1 WHERE id_pergunta = ?`;
    return this.bd.exec(query, [id_pergunta]);
  }
}

module.exports = VotacaoRepository;