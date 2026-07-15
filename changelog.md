# 0.0.1
- Adicionado o modelo conceitual e lógico da tabela "users"
- Adicionado log ao iniciar o servidor

# 0.1.0
- Adicionado o banco em sqlite
- Criada a tabela "users"

# 0.2.0
- Adicionada a rota "auth/register"
- Criada as validações iniciais para registro
- Criada conexão com o banco
- Inserção bem-sucedida

# 0.3.0
- Adicionada a rota "auth/login"
- Criada as validações iniciais para login

# 0.4.0
- Adicionada a dependência "dotenv"
- Adicionado o arquivo .env
- Variáveis de ambiente adicionadas

# 0.5.0
- Adicionado o arquivo "routes"
- Rotas movidas para o novo arquivo, limpando o código do entrypoint

# 0.6.0
- Separação dos arquivos de rotas: index e auth
- Refatoração dos arquivos de rota e database para uma abordagem OO
- Criada a interface "Database"
- Criada a classe "SQLiteDatabase"

# 0.7.0
- Separação de arquivos (controllers)
- Refatoração para criar "Containers de Serviço"