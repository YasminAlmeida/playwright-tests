# Projeto de Automação de Testes com Playwright

Este projeto tem como objetivo demonstrar habilidades em automação de testes utilizando o framework Playwright. A automação segue as melhores práticas de organização de código, incluindo a implementação do padrão Page Object Model (POM) para garantir modularidade, reutilização de código e facilidade de manutenção.

Os testes foram desenvolvidos para a aplicação Sauce Demo, um e-commerce fictício que simula processos comuns de compra online.

## **Tecnologias Utilizadas**

- **[Playwright](https://playwright.dev/)**: Framework de automação de testes para navegadores modernos.
- **TypeScript**: Linguagem utilizada para escrever os testes, garantindo tipagem estática e maior robustez ao código.
- **GitHub**: Controle de versão e hospedagem do código-fonte.
- **Node.js**: Ambiente de execução para os testes.

## **Casos de Teste Implementados**

Foram implementados os seguintes cenários de teste:

1. **Login:**

   - Login com credenciais válidas
   - Login com credenciais inválidas
   - Logout

2. **Carrinho de Compras na Página Home:**

   - Adicionar item ao carrinho
   - Remover item do carrinho
   - Resetar o estado do carrinho

3. **Carrinho de Compras na Página de Cart e Checkout:**

   - Adicionar item ao carrinho e validar na página de cart
   - Realizar a compra de um item
   - Realizar a compra de vários itens

4. **Ordenação de Produtos:**
   - Ordenar produtos por menor preço (low to high)
   - Ordenar produtos por maior preço (high to low)
   - Ordenar produtos por ordem alfabética (A-Z)
   - Ordenar produtos por ordem alfabética (Z-A)

## **Como Executar o Projeto**

### **Pré-requisitos**

- Node.js instalado (versão 16 ou superior).
- NPM ou Yarn para gerenciamento de dependências.

### **Passos para Execução**

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/meu-projeto-playwright.git
   cd meu-projeto-playwright
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute os testes:**

   ```bash
   npx playwright test
   ```

4. **Execute os testes específicos:**

   ```bash
   npx playwright test tests/login.spec.ts  # Apenas testes de login
   npx playwright test tests/carrinho.spec.ts  # Apenas testes de carrinho
   npx playwright test tests/ordenacao.spec.ts  # Apenas testes de ordenação
   ```

5. **Gere relatórios de execução:**
   ```bash
   npx playwright show-report
   ```

## **Relatórios de Testes**

Os relatórios de testes são gerados automaticamente após a execução. Eles podem ser acessados na pasta `reports` ou através do comando `npx playwright show-report`. O relatório HTML fornece uma visão detalhada dos testes executados, incluindo:

- Status dos testes (passou/falhou).
- Screenshots e vídeos dos testes (em caso de falha).
- Logs de execução.

## **Boas Práticas Seguidas**

- **Page Object Model (POM):** As interações com as páginas foram encapsuladas em classes separadas, garantindo a reutilização de código e a facilidade de manutenção.
- **Testes Isolados e Independentes:** Cada teste foi projetado para ser executado de forma independente, sem depender de outros testes.
- **Hooks do Playwright:** Utilizamos beforeEach para configuração comum, melhorando a legibilidade e organização dos testes.
- **Seletores Robustos:** Implementamos seletores resilientes a mudanças na interface, privilegiando atributos data-test.
- **Tratamento de Erros:** Adicionamos try-catch para operações críticas, garantindo melhor diagnóstico de falhas.
- **Timeouts Personalizados:** Configuramos timeouts adequados para diferentes operações, aumentando a estabilidade dos testes.
