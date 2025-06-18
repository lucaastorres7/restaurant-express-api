# API de Restaurante - Express
## 📖 Sobre o Projeto
Essa é uma API REST desenvolvida para gerenciar pedidos feitos em mesas de restaurantes. O projeto utiliza Node.js com o framework Express para a construção do servidor. A persistência de dados é feita com SQLite, e as interações com o banco de dados são gerenciadas pelo Knex.js.


## ✨ Funcionalidades
- **Gerenciamento de Mesas**: Operações de CRUD para as mesas.
- **Gerenciamento de Produtos**: Operações de CRUD para os produtos.
- **Gerenciamento de Sessões de Mesas**: Operações de CRUD para fechar e abrir sessões.


## 🛠️ Tecnologias Utilizadas
- **Node.js**: Ambiente de execução do servidor.
- **Express**: Framework para construção de APIs de forma rápida e minimalista.
- **SQLite**: Banco de dados SQL imbutido, baseado em arquivo.
- **Knex.js**: Um query builder para Node.js, permitindo a construção de consultas SQL de forma programática e gerenciamento de schema com migrations.


## 🚀 Como Executar o Projeto
1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/lucaastorres7/restaurant-express-api.git
    cd restaurant-express-api
    ```
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Crie um `.env`**:
   
   ```bash
   # Porta da aplicação
   PORT=3333
   ```
   - O servidor estará disponível em `http://localhost:3333`.
5. **Execute o server**:
   ```bash
   npm run dev 
   ```


## 👤 Autor
| <img src="https://avatars.githubusercontent.com/u/151575079?s=400&u=96fac0907f9100c143dc9f46242cacdf17af240f&v=4" alt="Lucas Torres" width="150" height="150"> |
| --------------------------------------------------------------------------------------------------------------- |
| [Lucas Torres](https://github.com/lucaastorres7)                                                                |
