# Usar uma imagem base do Node.js para construir o app
FROM node:18 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código para o container
COPY . .

# Construir o app React para produção
RUN npm run build

# Usar uma imagem do Nginx para servir a aplicação
FROM nginx:alpine

# Copiar os arquivos build do app React para o diretório de arquivos estáticos do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Modificar a configuração do Nginx para escutar na porta 3001
RUN echo "server { listen 3001; location / { root /usr/share/nginx/html; try_files $uri $uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

# Expor a porta 3001 para o Nginx
EXPOSE 3001

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
