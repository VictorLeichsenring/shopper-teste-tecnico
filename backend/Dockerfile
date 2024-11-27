# Base Node.js image
FROM node:18

# Diretório de trabalho no container
WORKDIR /app

# Copiar arquivos necessários
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Comando de inicialização
ENTRYPOINT ["sh", "-c", "npm run db:reset && npm start"]
