# Usar uma imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Definir a variável de ambiente para a API URL
ENV REACT_APP_API_URL=http://<IP_da_instancia_EC2>  

# Definir a variável de ambiente para a porta
ENV PORT=3001

# Expor a porta 3001
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
