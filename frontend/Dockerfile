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

# Expor a porta padrão do Vite
EXPOSE 80

# Rodar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev", "--", "--host", "--port", "80"]
