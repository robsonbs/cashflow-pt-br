# Cashflow 101 - Versão Brasileira

🎲 Jogo de tabuleiro educacional sobre finanças pessoais e investimentos, baseado no clássico "Cashflow 101" de Robert Kiyosaki, totalmente em português brasileiro.

## 🎯 Sobre o Projeto

Este é um jogo web interativo que simula o famoso jogo de tabuleiro Cashflow 101, criado para ensinar conceitos de educação financeira de forma divertida e envolvente. O jogo foi desenvolvido utilizando apenas tecnologias web padrão: HTML5, CSS3 e JavaScript puro (Vanilla JS).

## 🚀 Características

### Tecnologias
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design responsivo com gradientes e animações
- **Vanilla JavaScript**: Lógica de jogo sem frameworks externos
- **ES6 Modules**: Código modular e organizado

### Funcionalidades do Jogo

#### 6 Profissões Iniciais
Escolha entre diferentes carreiras, cada uma com seus próprios desafios financeiros:
- 👷 **Engenheiro** - Salário: R$ 4.900
- 📚 **Professor** - Salário: R$ 3.300
- 🔧 **Mecânico** - Salário: R$ 2.000
- 🏥 **Enfermeira** - Salário: R$ 3.100
- 💼 **Secretária** - Salário: R$ 2.500
- 📊 **Gerente** - Salário: R$ 4.600

#### Sistema Financeiro Completo
- **Demonstração de Resultado**: Receita, Despesas e Fluxo de Caixa
- **Balanço Patrimonial**: Dinheiro, Ativos e Passivos
- Cálculo automático de renda passiva
- Rastreamento de múltiplos investimentos

#### Tipos de Cartas
- **🔵 Oportunidades**: Ações, Imóveis e Negócios para investir
- **🔴 Despesas Extra (Doodads)**: Gastos inesperados que reduzem seu fluxo de caixa
- **🟠 Mercado**: Oportunidades de compra e venda de ativos

#### Mecânicas do Jogo
- Tabuleiro circular com 24 espaços
- Sistema de dados (1-6)
- Espaços especiais:
  - 💰 **Dia de Pagamento**: Receba seu salário
  - ❤️ **Caridade**: Doe e ganhe dados extras
  - 👶 **Criança**: Aumente suas despesas
  - 📉 **Demitido**: Pule um turno
- **Objetivo**: Escapar da "Corrida dos Ratos" e alcançar a "Pista Rápida"

## 📱 Como Jogar

### Instalação
Não é necessária instalação! Basta abrir o arquivo `index.html` em qualquer navegador web moderno.

```bash
# Clone o repositório
git clone https://github.com/robsonbs/cashflow-pt-br.git

# Entre na pasta
cd cashflow-pt-br

# Abra o arquivo index.html no seu navegador
# Ou inicie um servidor local:
python3 -m http.server 8080
# Acesse http://localhost:8080
```

### Instruções do Jogo

1. **Iniciar**: Clique em "Iniciar Jogo"
2. **Escolher Profissão**: Selecione uma das 6 profissões disponíveis
3. **Jogar Dados**: Clique em "Jogar Dados" para mover seu peão
4. **Interagir com Cartas**: Aceite ou recuse oportunidades de investimento
5. **Gerenciar Finanças**: Acompanhe sua demonstração financeira
6. **Objetivo**: Construa renda passiva maior que suas despesas para escapar da Corrida dos Ratos!

## 🎨 Design Responsivo

O jogo funciona perfeitamente em:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (até 767px)

## 📂 Estrutura do Projeto

```
cashflow-pt-br/
├── index.html          # Página principal do jogo
├── styles.css          # Estilos e design responsivo
├── js/
│   ├── main.js        # Controlador principal da UI
│   ├── game.js        # Lógica do jogo e gerenciamento de estado
│   └── cards.js       # Sistema de cartas e espaços do tabuleiro
└── README.md          # Este arquivo
```

## 🎓 Conceitos de Educação Financeira

O jogo ensina importantes conceitos financeiros:

- **Fluxo de Caixa**: A diferença entre receita e despesas
- **Ativos vs Passivos**: Entenda o que realmente gera riqueza
- **Renda Passiva**: Dinheiro que você ganha sem trabalhar ativamente
- **Corrida dos Ratos**: O ciclo de trabalhar apenas para pagar contas
- **Pista Rápida**: Liberdade financeira através de investimentos
- **Doodads**: Gastos que não agregam valor ao seu patrimônio

## 🛠️ Desenvolvimento

### Tecnologias Utilizadas
- HTML5 para estrutura
- CSS3 com Grid e Flexbox para layout
- JavaScript ES6+ com Modules
- Sem dependências externas

### Arquitetura
O código segue princípios de programação orientada a objetos:
- `GameState`: Gerencia o estado global do jogo
- `Player`: Representa um jogador com suas finanças
- `CardDeck`: Gerencia os diferentes tipos de cartas
- `BoardSpaces`: Controla a lógica dos espaços do tabuleiro
- `GameController`: Conecta a lógica com a interface

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Adicionar mais cartas e profissões

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por robsonbs

## 🙏 Agradecimentos

Inspirado no jogo "Cashflow 101" de Robert Kiyosaki, criado para fins educacionais.

---

**Divirta-se aprendendo sobre finanças! 🎮💰**