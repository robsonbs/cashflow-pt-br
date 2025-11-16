# Cashflow - Jogo Educativo Financeiro 🎲💰

Um jogo de tabuleiro educativo baseado no clássico Cashflow, desenvolvido em **Vanilla JavaScript, HTML e CSS**, completamente em **Português do Brasil**.

![Tela de Configuração](https://github.com/user-attachments/assets/128366d7-4399-49a9-810e-1be7732909b9)

## 📋 Sobre o Jogo

Cashflow é um jogo educativo que ensina conceitos fundamentais de finanças pessoais, investimentos e liberdade financeira. O objetivo é sair da "Corrida dos Ratos" aumentando sua renda passiva acima de suas despesas totais.

## ✨ Funcionalidades

### 🎮 Mecânicas de Jogo

- **Sistema de Turnos**: 2-6 jogadores podem participar
- **6 Profissões Diferentes**: Enfermeiro, Professor, Secretário, Policial, Engenheiro e Mecânico
- **Tabuleiro com 24 Espaços**: Incluindo oportunidades, mercado, caridade, dia de pagamento, e mais
- **Sistema de Dados**: Rolagem aleatória para movimentação dos jogadores
- **Tokens Coloridos**: Cada jogador tem um token único no tabuleiro

### 💰 Sistema Financeiro

- **Fluxo de Caixa**: Cálculo automático de receitas e despesas
- **Ativos e Passivos**: Gerenciamento completo de investimentos
- **Cartões de Oportunidade**:
  - Imóveis (casas, apartamentos, terrenos)
  - Ações (com preços variáveis)
  - Grandes negócios (franquias, empresas)
- **Cartões de Mercado**: Eventos que afetam seus investimentos
- **Compra e Venda**: Sistema completo de transações

### 🎯 Condição de Vitória

Sair da Corrida dos Ratos quando sua **renda passiva** (de ativos) for maior ou igual às suas **despesas totais**.

## 🖥️ Interface do Usuário

![Tela do Jogo](https://github.com/user-attachments/assets/6ce3dbaa-8d89-4889-a0b7-629e4c609a73)

### Características da UI

- ✅ **Clareza e Legibilidade**: Números grandes e bom contraste
- ✅ **Consistência Visual**: Design coeso com gradientes modernos
- ✅ **Feedback Instantâneo**: Notificações imediatas de ações
- ✅ **Organização Lógica**: Painéis bem estruturados
- ✅ **Responsividade**: Adaptável para diferentes tamanhos de tela
- ✅ **Histórico**: Registro completo de todas as ações do jogo

## 🚀 Como Jogar

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/robsonbs/cashflow-pt-br.git
cd cashflow-pt-br
```

2. Abra o arquivo `index.html` em seu navegador

Ou use um servidor HTTP local:
```bash
python3 -m http.server 8080
# Acesse http://localhost:8080
```

### Regras Básicas

1. **Configuração**: Escolha o número de jogadores (2-6) e as profissões
2. **Turnos**: Role os dados e mova seu token
3. **Espaços do Tabuleiro**:
   - 🟢 **Dia de Pagamento/Início**: Receba seu fluxo de caixa
   - 🔵 **Oportunidade**: Compre ativos (imóveis, ações, negócios)
   - 🟡 **Mercado**: Eventos que afetam seus investimentos
   - 🔴 **Caridade**: Doe e ganhe benefícios
   - 🟣 **Bebê**: Aumente suas despesas familiares
   - ⚫ **Desempregado**: Perca turnos

4. **Estratégia**: Compre ativos que geram fluxo de caixa positivo
5. **Vitória**: Saia da Corrida dos Ratos!

## 📁 Estrutura do Projeto

```
cashflow-pt-br/
├── index.html          # Estrutura HTML do jogo
├── style.css           # Estilos e design responsivo
├── game.js             # Lógica principal do jogo
├── data.js             # Dados do jogo (profissões, cartas)
└── README.md           # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com gradientes e animações
- **Vanilla JavaScript (ES6+)**: Lógica do jogo sem frameworks

### Padrões Implementados

- ✅ Gerenciamento de estado centralizado (`gameState`)
- ✅ Funções modulares e reutilizáveis
- ✅ Manipulação do DOM eficiente
- ✅ Event listeners organizados
- ✅ Validação de entrada
- ✅ Comentários em português

## 💡 Conceitos Financeiros Ensinados

- **Fluxo de Caixa**: Diferença entre receitas e despesas
- **Ativos vs Passivos**: O que coloca dinheiro no seu bolso vs o que tira
- **Renda Passiva**: Dinheiro que você ganha sem trabalhar ativamente
- **Investimentos**: Imóveis, ações e negócios
- **Gestão Financeira**: Tomada de decisões com recursos limitados

## 🎨 Capturas de Tela

### Carta de Oportunidade
![Carta de Oportunidade](https://github.com/user-attachments/assets/73958093-6363-4475-bffa-7d114217d5be)

### Carta de Mercado
![Carta de Mercado](https://github.com/user-attachments/assets/b08bcf0a-51d2-40c1-b3e7-f89044ed5cc3)

### Jogo em Progresso
![Jogo em Progresso](https://github.com/user-attachments/assets/31a8739b-505a-4380-9780-5931b046cf6d)

## 🎓 Funcionalidades Técnicas

### JavaScript Modular

```javascript
// Exemplo de função auxiliar
function formatCurrency(amount) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}
```

### Estado Centralizado

```javascript
let gameState = {
  fase: 'configuracao',
  jogadores: [],
  jogadorAtualIndex: 0,
  baralhoOportunidades: [],
  baralhoMercado: []
};
```

### Cálculos Financeiros

- Fluxo de caixa automático
- Atualização de ativos e passivos
- Verificação de condições de vitória
- Validação de transações

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Robson Barbosa**
- GitHub: [@robsonbs](https://github.com/robsonbs)

## 🙏 Agradecimentos

Inspirado no jogo Cashflow de Robert Kiyosaki, este projeto foi desenvolvido com fins educacionais para ensinar conceitos de educação financeira de forma divertida e interativa.

---

**Divirta-se aprendendo sobre finanças! 🎮💰**