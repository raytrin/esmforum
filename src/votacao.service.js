class VotacaoService {
  constructor(repository) {
    this.repository = repository;
    this.estrategiasDeVoto = {
      'up': 'upvotes',
      'down': 'downvotes'
    };
  }

  registrarVoto(id_pergunta, tipo) {
    const colunaBD = this.estrategiasDeVoto[tipo];
    if (!colunaBD) throw new Error("Tipo de voto inválido. Use 'up' ou 'down'.");
    return this.repository.atualizarVotos(id_pergunta, colunaBD);
  }
}

module.exports = VotacaoService;