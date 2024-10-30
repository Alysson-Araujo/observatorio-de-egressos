# Use uma imagem Node.js com Yarn como base
FROM node:20

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo yarn.lock para o diretório de trabalho
COPY package*.json yarn.lock ./

# Instale as dependências
RUN yarn install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Copie o arquivo .env para o diretório de trabalho
COPY .env ./

# Compile o código TypeScript e gere os arquivos de build do Vite
RUN yarn build

# Exponha a porta em que a aplicação estará em execução
EXPOSE 5173

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["yarn", "dev", "--host"]

