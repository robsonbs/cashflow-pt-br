// Dados do jogo Cashflow em Português do Brasil

// Profissões disponíveis no jogo
const professions = {
  enfermeiro: {
    nome: "Enfermeiro",
    salario: 3100,
    impostos: 630,
    despesasResidencia: 400,
    despesasEscola: 0,
    despesasCarro: 100,
    despesasCartaoCredito: 90,
    despesasVarejoOutras: 50,
    despesasFilhos: 0,
    emprestimoBancario: 0,
    pagamentoEmprestimoEstudantil: 60,
    pagamentoEmprestimoCarro: 60,
    pagamentoCartaoCredito: 90,
    hipoteca: 31000,
    emprestimoEstudantil: 6000,
    emprestimoCarro: 3000,
    dividaCartaoCredito: 1000,
    poupanca: 620
  },
  professor: {
    nome: "Professor",
    salario: 3300,
    impostos: 630,
    despesasResidencia: 500,
    despesasEscola: 0,
    despesasCarro: 100,
    despesasCartaoCredito: 60,
    despesasVarejoOutras: 50,
    despesasFilhos: 0,
    emprestimoBancario: 0,
    pagamentoEmprestimoEstudantil: 60,
    pagamentoEmprestimoCarro: 60,
    pagamentoCartaoCredito: 60,
    hipoteca: 38000,
    emprestimoEstudantil: 12000,
    emprestimoCarro: 5000,
    dividaCartaoCredito: 3000,
    poupanca: 400
  },
  secretario: {
    nome: "Secretário",
    salario: 2500,
    impostos: 460,
    despesasResidencia: 400,
    despesasEscola: 0,
    despesasCarro: 80,
    despesasCartaoCredito: 60,
    despesasVarejoOutras: 50,
    despesasFilhos: 0,
    emprestimoBancario: 0,
    pagamentoEmprestimoEstudantil: 50,
    pagamentoEmprestimoCarro: 80,
    pagamentoCartaoCredito: 60,
    hipoteca: 28000,
    emprestimoEstudantil: 4000,
    emprestimoCarro: 4000,
    dividaCartaoCredito: 3000,
    poupanca: 710
  },
  policial: {
    nome: "Policial",
    salario: 3000,
    impostos: 580,
    despesasResidencia: 400,
    despesasEscola: 0,
    despesasCarro: 100,
    despesasCartaoCredito: 60,
    despesasVarejoOutras: 50,
    despesasFilhos: 0,
    emprestimoBancario: 0,
    pagamentoEmprestimoEstudantil: 0,
    pagamentoEmprestimoCarro: 60,
    pagamentoCartaoCredito: 60,
    hipoteca: 38000,
    emprestimoEstudantil: 0,
    emprestimoCarro: 6000,
    dividaCartaoCredito: 2000,
    poupanca: 560
  },
  engenheiro: {
    nome: "Engenheiro",
    salario: 4900,
    impostos: 1050,
    despesasResidencia: 700,
    despesasEscola: 0,
    despesasCarro: 140,
    despesasCartaoCredito: 120,
    despesasVarejoOutras: 60,
    despesasFilhos: 0,
    emprestimoBancario: 0,
    pagamentoEmprestimoEstudantil: 60,
    pagamentoEmprestimoCarro: 140,
    pagamentoCartaoCredito: 120,
    hipoteca: 75000,
    emprestimoEstudantil: 12000,
    emprestimoCarro: 7000,
    dividaCartaoCredito: 4000,
    poupanca: 1040
  },
  mecanico: {
    nome: "Mecânico",
    salario: 2000,
    impostos: 360,
    despesasResidencia: 300,
    despesasEscola: 0,
    despesasCarro: 60,
    despesasCartaoCredito: 60,
    despesasVarejoOutras: 40,
    despesasFilhos: 0,
    emprestimoBancario: 0,
    pagamentoEmprestimoEstudantil: 0,
    pagamentoEmprestimoCarro: 60,
    pagamentoCartaoCredito: 60,
    hipoteca: 20000,
    emprestimoEstudantil: 0,
    emprestimoCarro: 4000,
    dividaCartaoCredito: 2000,
    poupanca: 670
  }
};

// Cartas de Oportunidades (Pequenos Negócios e Grandes Negócios)
const opportunityCards = [
  {
    tipo: "pequeno_negocio",
    nome: "Casa 3Q/2B",
    descricao: "Casa de 3 quartos e 2 banheiros em bairro residencial",
    precoEntrada: 5000,
    custo: 50000,
    hipoteca: 45000,
    fluxoCaixa: 100,
    tipoAtivo: "imovel"
  },
  {
    tipo: "pequeno_negocio",
    nome: "Apartamento 2Q/1B",
    descricao: "Apartamento de 2 quartos e 1 banheiro",
    precoEntrada: 3000,
    custo: 35000,
    hipoteca: 32000,
    fluxoCaixa: 80,
    tipoAtivo: "imovel"
  },
  {
    tipo: "pequeno_negocio",
    nome: "Duplex",
    descricao: "Casa duplex com 2 unidades residenciais",
    precoEntrada: 7000,
    custo: 70000,
    hipoteca: 63000,
    fluxoCaixa: 200,
    tipoAtivo: "imovel"
  },
  {
    tipo: "pequeno_negocio",
    nome: "Lote de Terreno",
    descricao: "Terreno em área de desenvolvimento",
    precoEntrada: 2000,
    custo: 10000,
    hipoteca: 8000,
    fluxoCaixa: 0,
    tipoAtivo: "imovel"
  },
  {
    tipo: "acao",
    nome: "Ação ON4U",
    descricao: "Ação de tecnologia",
    precoAtual: 10,
    faixaPreco: { min: 5, max: 40 },
    tipoAtivo: "acao"
  },
  {
    tipo: "acao",
    nome: "Ação MYT4U",
    descricao: "Ação de varejo",
    precoAtual: 20,
    faixaPreco: { min: 10, max: 60 },
    tipoAtivo: "acao"
  },
  {
    tipo: "acao",
    nome: "Ação GRO4K",
    descricao: "Ação de alimentos",
    precoAtual: 15,
    faixaPreco: { min: 10, max: 50 },
    tipoAtivo: "acao"
  },
  {
    tipo: "acao",
    nome: "Ação OK4U",
    descricao: "Ação de saúde",
    precoAtual: 5,
    faixaPreco: { min: 5, max: 20 },
    tipoAtivo: "acao"
  },
  {
    tipo: "grande_negocio",
    nome: "Franquia Fast Food",
    descricao: "Franquia de rede de fast food estabelecida",
    precoEntrada: 50000,
    custo: 200000,
    fluxoCaixa: 5000,
    tipoAtivo: "negocio"
  },
  {
    tipo: "grande_negocio",
    nome: "Empresa de Software",
    descricao: "Startup de software em crescimento",
    precoEntrada: 100000,
    custo: 500000,
    fluxoCaixa: 10000,
    tipoAtivo: "negocio"
  },
  {
    tipo: "grande_negocio",
    nome: "Edifício Comercial",
    descricao: "Prédio comercial com múltiplos inquilinos",
    precoEntrada: 75000,
    custo: 300000,
    fluxoCaixa: 8000,
    tipoAtivo: "imovel"
  }
];

// Cartas de Mercado (Eventos que afetam o mercado)
const marketCards = [
  {
    tipo: "mercado_imobiliario",
    descricao: "Boom imobiliário! Venda suas propriedades por 2x o preço original.",
    efeito: "multiplicador",
    fator: 2,
    ativoAfetado: "imovel"
  },
  {
    tipo: "mercado_acoes",
    descricao: "Mercado de ações em alta! Venda suas ações pelo dobro do preço atual.",
    efeito: "multiplicador",
    fator: 2,
    ativoAfetado: "acao"
  },
  {
    tipo: "mercado_acoes",
    descricao: "Crash do mercado! O preço das ações caiu pela metade.",
    efeito: "divisor",
    fator: 2,
    ativoAfetado: "acao"
  },
  {
    tipo: "despesa_imprevista",
    descricao: "Despesa médica de emergência. Pague R$ 2.000.",
    efeito: "despesa",
    valor: 2000
  },
  {
    tipo: "ganho_inesperado",
    descricao: "Você recebeu um bônus no trabalho! Ganhe R$ 3.000.",
    efeito: "ganho",
    valor: 3000
  },
  {
    tipo: "oportunidade_especial",
    descricao: "Herança! Você recebeu R$ 10.000.",
    efeito: "ganho",
    valor: 10000
  },
  {
    tipo: "despesa_imprevista",
    descricao: "Reparo no carro. Pague R$ 1.500.",
    efeito: "despesa",
    valor: 1500
  },
  {
    tipo: "caridade",
    descricao: "Você decide fazer uma doação para caridade de R$ 1.000. Ganhe 1 turno extra.",
    efeito: "caridade",
    valor: 1000,
    bonus: "turno_extra"
  }
];

// Espaços do tabuleiro (Corrida dos Ratos)
const boardSpaces = [
  { posicao: 0, tipo: "inicio", nome: "Início", descricao: "Receba seu salário" },
  { posicao: 1, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 2, tipo: "mercado", nome: "Mercado", descricao: "Evento de mercado" },
  { posicao: 3, tipo: "caridade", nome: "Caridade", descricao: "Doe para caridade" },
  { posicao: 4, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 5, tipo: "dia_pagamento", nome: "Dia de Pagamento", descricao: "Receba seu salário" },
  { posicao: 6, tipo: "mercado", nome: "Mercado", descricao: "Evento de mercado" },
  { posicao: 7, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 8, tipo: "bebe", nome: "Bebê", descricao: "Você teve um bebê!" },
  { posicao: 9, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 10, tipo: "desempregado", nome: "Desempregado", descricao: "Pule os próximos 2 turnos" },
  { posicao: 11, tipo: "mercado", nome: "Mercado", descricao: "Evento de mercado" },
  { posicao: 12, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 13, tipo: "dia_pagamento", nome: "Dia de Pagamento", descricao: "Receba seu salário" },
  { posicao: 14, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 15, tipo: "mercado", nome: "Mercado", descricao: "Evento de mercado" },
  { posicao: 16, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 17, tipo: "caridade", nome: "Caridade", descricao: "Doe para caridade" },
  { posicao: 18, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 19, tipo: "dia_pagamento", nome: "Dia de Pagamento", descricao: "Receba seu salário" },
  { posicao: 20, tipo: "mercado", nome: "Mercado", descricao: "Evento de mercado" },
  { posicao: 21, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" },
  { posicao: 22, tipo: "bebe", nome: "Bebê", descricao: "Você teve um bebê!" },
  { posicao: 23, tipo: "oportunidade", nome: "Oportunidade", descricao: "Compre um ativo" }
];
