// Game.js - Lógica principal do jogo Cashflow
// Gerenciamento de estado centralizado e funções de jogo

// Estado global do jogo
let gameState = {
  fase: 'configuracao', // 'configuracao', 'corrida_ratos', 'pista_rapida'
  jogadores: [],
  jogadorAtualIndex: 0,
  numeroJogadores: 0,
  turnosDesemprego: {}, // Rastreia turnos de desemprego por jogador
  baralhoOportunidades: [],
  baralhoMercado: [],
  historico: []
};

// Inicializar o jogo
function initGame() {
  console.log('Inicializando jogo Cashflow...');
  mostrarTelaConfiguracao();
}

// Mostrar tela de configuração
function mostrarTelaConfiguracao() {
  const telaConfig = document.getElementById('tela-configuracao');
  const telaJogo = document.getElementById('tela-jogo');
  
  telaConfig.style.display = 'block';
  telaJogo.style.display = 'none';
  
  // Configurar eventos dos botões
  document.getElementById('btn-iniciar-jogo').addEventListener('click', iniciarJogo);
}

// Iniciar o jogo após configuração
function iniciarJogo() {
  const numJogadores = parseInt(document.getElementById('num-jogadores').value);
  
  if (numJogadores < 2 || numJogadores > 6) {
    alert('Por favor, selecione entre 2 e 6 jogadores.');
    return;
  }
  
  gameState.numeroJogadores = numJogadores;
  gameState.jogadores = [];
  
  // Criar jogadores
  for (let i = 0; i < numJogadores; i++) {
    const profissaoSelect = document.getElementById(`profissao-jogador-${i + 1}`);
    const profissaoKey = profissaoSelect ? profissaoSelect.value : 'enfermeiro';
    const profissaoData = professions[profissaoKey];
    
    const jogador = criarJogador(i + 1, profissaoData, profissaoKey);
    gameState.jogadores.push(jogador);
  }
  
  // Embaralhar baralhos
  gameState.baralhoOportunidades = embaralharArray([...opportunityCards]);
  gameState.baralhoMercado = embaralharArray([...marketCards]);
  
  gameState.fase = 'corrida_ratos';
  gameState.jogadorAtualIndex = 0;
  
  // Mostrar tela do jogo
  mostrarTelaJogo();
}

// Criar um jogador com dados iniciais
function criarJogador(numero, profissaoData, profissaoKey) {
  const despesasTotais = calcularDespesasTotais(profissaoData);
  const fluxoCaixa = profissaoData.salario - despesasTotais;
  
  return {
    numero: numero,
    nome: `Jogador ${numero}`,
    profissao: profissaoData.nome,
    profissaoKey: profissaoKey,
    posicao: 0,
    dinheiro: profissaoData.poupanca,
    salario: profissaoData.salario,
    despesas: {
      impostos: profissaoData.impostos,
      residencia: profissaoData.despesasResidencia,
      escola: profissaoData.despesasEscola,
      carro: profissaoData.despesasCarro,
      cartaoCredito: profissaoData.despesasCartaoCredito,
      varejoOutras: profissaoData.despesasVarejoOutras,
      filhos: profissaoData.despesasFilhos,
      emprestimoBancario: profissaoData.emprestimoBancario,
      pagamentoEmprestimoEstudantil: profissaoData.pagamentoEmprestimoEstudantil,
      pagamentoEmprestimoCarro: profissaoData.pagamentoEmprestimoCarro,
      pagamentoCartaoCredito: profissaoData.pagamentoCartaoCredito
    },
    passivos: {
      hipoteca: profissaoData.hipoteca,
      emprestimoEstudantil: profissaoData.emprestimoEstudantil,
      emprestimoCarro: profissaoData.emprestimoCarro,
      dividaCartaoCredito: profissaoData.dividaCartaoCredito
    },
    ativos: [],
    fluxoCaixa: fluxoCaixa,
    numeroFilhos: 0,
    turnoPulado: 0
  };
}

// Calcular despesas totais de um jogador
function calcularDespesasTotais(profissaoData) {
  return profissaoData.impostos + 
         profissaoData.despesasResidencia + 
         profissaoData.despesasEscola + 
         profissaoData.despesasCarro + 
         profissaoData.despesasCartaoCredito + 
         profissaoData.despesasVarejoOutras + 
         profissaoData.despesasFilhos + 
         profissaoData.emprestimoBancario + 
         profissaoData.pagamentoEmprestimoEstudantil + 
         profissaoData.pagamentoEmprestimoCarro + 
         profissaoData.pagamentoCartaoCredito;
}

// Mostrar tela do jogo
function mostrarTelaJogo() {
  const telaConfig = document.getElementById('tela-configuracao');
  const telaJogo = document.getElementById('tela-jogo');
  
  telaConfig.style.display = 'none';
  telaJogo.style.display = 'block';
  
  // Criar tabuleiro
  criarTabuleiro();
  
  // Atualizar UI do jogador atual
  atualizarUIJogador();
  
  // Configurar eventos de ações
  document.getElementById('btn-rolar-dados').addEventListener('click', rolarDados);
}

// Criar o tabuleiro visualmente
function criarTabuleiro() {
  const tabuleiroContainer = document.getElementById('tabuleiro');
  tabuleiroContainer.innerHTML = '';
  
  boardSpaces.forEach((espaco, index) => {
    const espacoDiv = document.createElement('div');
    espacoDiv.className = `espaco espaco-${espaco.tipo}`;
    espacoDiv.id = `espaco-${index}`;
    espacoDiv.innerHTML = `
      <div class="espaco-numero">${espaco.posicao}</div>
      <div class="espaco-nome">${espaco.nome}</div>
    `;
    tabuleiroContainer.appendChild(espacoDiv);
  });
  
  // Posicionar tokens dos jogadores
  atualizarPosicaoTokens();
}

// Atualizar posição visual dos tokens no tabuleiro
function atualizarPosicaoTokens() {
  // Limpar tokens existentes
  document.querySelectorAll('.token').forEach(token => token.remove());
  
  // Adicionar tokens dos jogadores
  gameState.jogadores.forEach(jogador => {
    const espacoDiv = document.getElementById(`espaco-${jogador.posicao}`);
    if (espacoDiv) {
      const token = document.createElement('div');
      token.className = `token token-jogador-${jogador.numero}`;
      token.textContent = jogador.numero;
      espacoDiv.appendChild(token);
    }
  });
}

// Atualizar UI com informações do jogador atual
function atualizarUIJogador() {
  const jogadorAtual = gameState.jogadores[gameState.jogadorAtualIndex];
  
  // Atualizar informações básicas
  document.getElementById('jogador-nome').textContent = jogadorAtual.nome;
  document.getElementById('jogador-profissao').textContent = jogadorAtual.profissao;
  
  // Atualizar informações financeiras
  document.getElementById('info-dinheiro').textContent = formatCurrency(jogadorAtual.dinheiro);
  document.getElementById('info-salario').textContent = formatCurrency(jogadorAtual.salario);
  document.getElementById('info-fluxo-caixa').textContent = formatCurrency(jogadorAtual.fluxoCaixa);
  
  // Atualizar despesas
  const despesasTotais = Object.values(jogadorAtual.despesas).reduce((a, b) => a + b, 0);
  document.getElementById('info-despesas').textContent = formatCurrency(despesasTotais);
  
  // Atualizar passivos
  const passivosTotais = Object.values(jogadorAtual.passivos).reduce((a, b) => a + b, 0);
  document.getElementById('info-passivos').textContent = formatCurrency(passivosTotais);
  
  // Atualizar ativos
  atualizarListaAtivos(jogadorAtual);
  
  // Verificar condição de vitória
  verificarCondicaoVitoria(jogadorAtual);
}

// Atualizar lista de ativos do jogador
function atualizarListaAtivos(jogador) {
  const listaAtivos = document.getElementById('lista-ativos');
  listaAtivos.innerHTML = '';
  
  if (jogador.ativos.length === 0) {
    listaAtivos.innerHTML = '<p class="sem-ativos">Nenhum ativo ainda</p>';
    return;
  }
  
  jogador.ativos.forEach((ativo, index) => {
    const ativoDiv = document.createElement('div');
    ativoDiv.className = 'ativo-item';
    ativoDiv.innerHTML = `
      <div class="ativo-nome">${ativo.nome}</div>
      <div class="ativo-fluxo">Fluxo: ${formatCurrency(ativo.fluxoCaixa || 0)}/mês</div>
      <button class="btn-vender-ativo" data-index="${index}">Vender</button>
    `;
    listaAtivos.appendChild(ativoDiv);
  });
  
  // Adicionar eventos de vender
  document.querySelectorAll('.btn-vender-ativo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      venderAtivo(index);
    });
  });
}

// Rolar dados
function rolarDados() {
  const jogadorAtual = gameState.jogadores[gameState.jogadorAtualIndex];
  
  // Verificar se o jogador está desempregado
  if (jogadorAtual.turnoPulado > 0) {
    jogadorAtual.turnoPulado--;
    adicionarHistorico(`${jogadorAtual.nome} está desempregado e pula o turno. Turnos restantes: ${jogadorAtual.turnoPulado}`);
    proximoJogador();
    return;
  }
  
  const dado = Math.floor(Math.random() * 6) + 1;
  
  // Mostrar resultado do dado
  document.getElementById('resultado-dado').textContent = `🎲 ${dado}`;
  
  adicionarHistorico(`${jogadorAtual.nome} rolou ${dado}`);
  
  // Mover jogador
  moverJogador(jogadorAtual, dado);
}

// Mover jogador no tabuleiro
function moverJogador(jogador, casas) {
  const novaPosicao = (jogador.posicao + casas) % boardSpaces.length;
  
  // Verificar se passou pelo início (dia de pagamento)
  if (novaPosicao < jogador.posicao) {
    receberSalario(jogador);
    adicionarHistorico(`${jogador.nome} passou pelo Dia de Pagamento!`);
  }
  
  jogador.posicao = novaPosicao;
  atualizarPosicaoTokens();
  
  // Processar o espaço onde caiu
  const espaco = boardSpaces[novaPosicao];
  processarEspaco(jogador, espaco);
}

// Processar o espaço do tabuleiro
function processarEspaco(jogador, espaco) {
  adicionarHistorico(`${jogador.nome} caiu em: ${espaco.nome}`);
  
  switch (espaco.tipo) {
    case 'inicio':
    case 'dia_pagamento':
      receberSalario(jogador);
      setTimeout(() => proximoJogador(), 2000);
      break;
    case 'oportunidade':
      mostrarCartaOportunidade();
      break;
    case 'mercado':
      mostrarCartaMercado();
      break;
    case 'caridade':
      mostrarOpcaoCaridade(jogador);
      break;
    case 'bebe':
      nasceuBebe(jogador);
      setTimeout(() => proximoJogador(), 2000);
      break;
    case 'desempregado':
      ficarDesempregado(jogador);
      setTimeout(() => proximoJogador(), 2000);
      break;
    default:
      setTimeout(() => proximoJogador(), 1000);
  }
}

// Receber salário (fluxo de caixa)
function receberSalario(jogador) {
  // Calcular renda de ativos
  const rendaAtivos = jogador.ativos.reduce((total, ativo) => {
    return total + (ativo.fluxoCaixa || 0);
  }, 0);
  
  // Fluxo de caixa total
  const fluxoCaixaTotal = jogador.fluxoCaixa + rendaAtivos;
  jogador.dinheiro += fluxoCaixaTotal;
  
  adicionarHistorico(`${jogador.nome} recebeu ${formatCurrency(fluxoCaixaTotal)} de fluxo de caixa`);
  atualizarUIJogador();
}

// Mostrar carta de oportunidade
function mostrarCartaOportunidade() {
  if (gameState.baralhoOportunidades.length === 0) {
    gameState.baralhoOportunidades = embaralharArray([...opportunityCards]);
  }
  
  const carta = gameState.baralhoOportunidades.pop();
  mostrarModalCarta('oportunidade', carta);
}

// Mostrar carta de mercado
function mostrarCartaMercado() {
  if (gameState.baralhoMercado.length === 0) {
    gameState.baralhoMercado = embaralharArray([...marketCards]);
  }
  
  const carta = gameState.baralhoMercado.pop();
  mostrarModalCarta('mercado', carta);
}

// Mostrar modal com carta
function mostrarModalCarta(tipo, carta) {
  const modal = document.getElementById('modal-carta');
  const modalTitulo = document.getElementById('modal-carta-titulo');
  const modalConteudo = document.getElementById('modal-carta-conteudo');
  const modalAcoes = document.getElementById('modal-carta-acoes');
  
  modal.style.display = 'flex';
  
  if (tipo === 'oportunidade') {
    modalTitulo.textContent = 'Oportunidade';
    
    let conteudoHTML = `
      <h3>${carta.nome}</h3>
      <p>${carta.descricao}</p>
    `;
    
    if (carta.tipo === 'acao') {
      conteudoHTML += `
        <p><strong>Preço Atual:</strong> ${formatCurrency(carta.precoAtual)}</p>
        <p><strong>Faixa de Preço:</strong> ${formatCurrency(carta.faixaPreco.min)} - ${formatCurrency(carta.faixaPreco.max)}</p>
        <label>Quantidade de ações:
          <input type="number" id="quantidade-acoes" min="0" value="100" step="100">
        </label>
      `;
    } else {
      conteudoHTML += `
        <p><strong>Entrada:</strong> ${formatCurrency(carta.precoEntrada)}</p>
        <p><strong>Custo Total:</strong> ${formatCurrency(carta.custo)}</p>
        <p><strong>Fluxo de Caixa:</strong> ${formatCurrency(carta.fluxoCaixa)}/mês</p>
      `;
    }
    
    modalConteudo.innerHTML = conteudoHTML;
    
    modalAcoes.innerHTML = `
      <button id="btn-comprar-ativo" class="btn-primary">Comprar</button>
      <button id="btn-recusar-ativo" class="btn-secondary">Recusar</button>
    `;
    
    document.getElementById('btn-comprar-ativo').addEventListener('click', () => {
      comprarAtivo(carta);
    });
    
    document.getElementById('btn-recusar-ativo').addEventListener('click', () => {
      fecharModalCarta();
      proximoJogador();
    });
  } else if (tipo === 'mercado') {
    modalTitulo.textContent = 'Mercado';
    modalConteudo.innerHTML = `<p>${carta.descricao}</p>`;
    
    processarCartaMercado(carta);
    
    modalAcoes.innerHTML = `
      <button id="btn-fechar-mercado" class="btn-primary">Continuar</button>
    `;
    
    document.getElementById('btn-fechar-mercado').addEventListener('click', () => {
      fecharModalCarta();
      proximoJogador();
    });
  }
}

// Fechar modal de carta
function fecharModalCarta() {
  document.getElementById('modal-carta').style.display = 'none';
}

// Comprar ativo
function comprarAtivo(carta) {
  const jogadorAtual = gameState.jogadores[gameState.jogadorAtualIndex];
  
  let custo;
  let ativo;
  
  if (carta.tipo === 'acao') {
    const quantidade = parseInt(document.getElementById('quantidade-acoes').value) || 0;
    
    if (quantidade <= 0) {
      alert('Quantidade inválida');
      return;
    }
    
    custo = carta.precoAtual * quantidade;
    
    ativo = {
      nome: carta.nome,
      tipo: 'acao',
      quantidade: quantidade,
      precoCompra: carta.precoAtual,
      precoAtual: carta.precoAtual,
      faixaPreco: carta.faixaPreco,
      fluxoCaixa: 0
    };
  } else {
    custo = carta.precoEntrada;
    
    ativo = {
      nome: carta.nome,
      tipo: carta.tipo,
      custo: carta.custo,
      hipoteca: carta.hipoteca || 0,
      fluxoCaixa: carta.fluxoCaixa,
      tipoAtivo: carta.tipoAtivo
    };
  }
  
  if (jogadorAtual.dinheiro < custo) {
    alert(`Você não tem dinheiro suficiente! Necessário: ${formatCurrency(custo)}`);
    return;
  }
  
  jogadorAtual.dinheiro -= custo;
  jogadorAtual.ativos.push(ativo);
  
  // Atualizar fluxo de caixa se houver
  if (ativo.fluxoCaixa) {
    jogadorAtual.fluxoCaixa += ativo.fluxoCaixa;
  }
  
  adicionarHistorico(`${jogadorAtual.nome} comprou ${ativo.nome} por ${formatCurrency(custo)}`);
  
  atualizarUIJogador();
  fecharModalCarta();
  proximoJogador();
}

// Vender ativo
function venderAtivo(index) {
  const jogadorAtual = gameState.jogadores[gameState.jogadorAtualIndex];
  const ativo = jogadorAtual.ativos[index];
  
  let valorVenda;
  
  if (ativo.tipo === 'acao') {
    valorVenda = ativo.precoAtual * ativo.quantidade;
  } else {
    valorVenda = ativo.custo || ativo.precoEntrada;
  }
  
  const confirma = confirm(`Vender ${ativo.nome} por ${formatCurrency(valorVenda)}?`);
  
  if (confirma) {
    jogadorAtual.dinheiro += valorVenda;
    
    // Remover fluxo de caixa do ativo
    if (ativo.fluxoCaixa) {
      jogadorAtual.fluxoCaixa -= ativo.fluxoCaixa;
    }
    
    jogadorAtual.ativos.splice(index, 1);
    
    adicionarHistorico(`${jogadorAtual.nome} vendeu ${ativo.nome} por ${formatCurrency(valorVenda)}`);
    atualizarUIJogador();
  }
}

// Processar carta de mercado
function processarCartaMercado(carta) {
  const jogadorAtual = gameState.jogadores[gameState.jogadorAtualIndex];
  
  switch (carta.efeito) {
    case 'multiplicador':
      // Oportunidade de vender ativos pelo multiplicador
      adicionarHistorico(`Oportunidade de vender ${carta.ativoAfetado} com multiplicador ${carta.fator}x`);
      break;
    case 'divisor':
      // Atualizar preço das ações
      jogadorAtual.ativos.forEach(ativo => {
        if (ativo.tipo === 'acao') {
          ativo.precoAtual = Math.max(ativo.faixaPreco.min, ativo.precoAtual / carta.fator);
        }
      });
      adicionarHistorico(`Preços das ações caíram!`);
      break;
    case 'despesa':
      jogadorAtual.dinheiro -= carta.valor;
      adicionarHistorico(`${jogadorAtual.nome} pagou ${formatCurrency(carta.valor)}`);
      break;
    case 'ganho':
      jogadorAtual.dinheiro += carta.valor;
      adicionarHistorico(`${jogadorAtual.nome} ganhou ${formatCurrency(carta.valor)}`);
      break;
    case 'caridade':
      if (jogadorAtual.dinheiro >= carta.valor) {
        jogadorAtual.dinheiro -= carta.valor;
        adicionarHistorico(`${jogadorAtual.nome} fez uma doação de ${formatCurrency(carta.valor)}`);
      }
      break;
  }
  
  atualizarUIJogador();
}

// Mostrar opção de caridade
function mostrarOpcaoCaridade(jogador) {
  const valorDoacao = Math.floor(jogador.fluxoCaixa * 0.1);
  
  if (jogador.dinheiro >= valorDoacao) {
    const escolha = confirm(`Deseja doar ${formatCurrency(valorDoacao)} para caridade e ganhar 3 turnos extras?`);
    
    if (escolha) {
      jogador.dinheiro -= valorDoacao;
      adicionarHistorico(`${jogador.nome} doou ${formatCurrency(valorDoacao)} para caridade`);
      // Implementar turnos extras (simplificado: próxima jogada imediata)
    }
  }
  
  atualizarUIJogador();
  setTimeout(() => proximoJogador(), 2000);
}

// Nasceu bebê
function nasceuBebe(jogador) {
  jogador.numeroFilhos++;
  
  // Adicionar despesas do filho
  const despesaFilho = 200;
  jogador.despesas.filhos += despesaFilho;
  jogador.fluxoCaixa -= despesaFilho;
  
  adicionarHistorico(`${jogador.nome} teve um bebê! Despesas aumentaram em ${formatCurrency(despesaFilho)}`);
  atualizarUIJogador();
}

// Ficar desempregado
function ficarDesempregado(jogador) {
  jogador.turnoPulado = 2;
  adicionarHistorico(`${jogador.nome} ficou desempregado! Pula os próximos 2 turnos.`);
}

// Verificar condição de vitória (sair da corrida dos ratos)
function verificarCondicaoVitoria(jogador) {
  // Vitória: fluxo de caixa passivo >= despesas totais
  const despesasTotais = Object.values(jogador.despesas).reduce((a, b) => a + b, 0);
  const rendaPassiva = jogador.ativos.reduce((total, ativo) => total + (ativo.fluxoCaixa || 0), 0);
  
  if (rendaPassiva >= despesasTotais) {
    const info = document.getElementById('info-condicao-vitoria');
    info.textContent = '🎉 PARABÉNS! Você saiu da Corrida dos Ratos!';
    info.style.display = 'block';
    info.classList.add('vitoria');
  }
}

// Próximo jogador
function proximoJogador() {
  gameState.jogadorAtualIndex = (gameState.jogadorAtualIndex + 1) % gameState.numeroJogadores;
  atualizarUIJogador();
  atualizarPosicaoTokens();
}

// Adicionar mensagem ao histórico
function adicionarHistorico(mensagem) {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  const historicoItem = `[${timestamp}] ${mensagem}`;
  
  gameState.historico.push(historicoItem);
  
  const historicoDiv = document.getElementById('historico');
  const p = document.createElement('p');
  p.textContent = historicoItem;
  historicoDiv.appendChild(p);
  
  // Scroll para o final
  historicoDiv.scrollTop = historicoDiv.scrollHeight;
  
  console.log(historicoItem);
}

// Função auxiliar: Formatar moeda em BRL
function formatCurrency(amount) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Função auxiliar: Embaralhar array
function embaralharArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Função auxiliar: Deep clone de objeto
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', initGame);
