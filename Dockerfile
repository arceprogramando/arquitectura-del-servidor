FROM node:16-alpine

# crea un directorio para nuestra API

RUN mkdir -p /usr/src/app

# Defino el directorio de de trabajo y donde estare ubicado

WORKDIR /usr/src/app

# Copio los package json

COPY package*.json ./

# Copio todos los archivos de la API hacia el contenedor

COPY . .

RUN npm install

ENV NODE_ENV=dev

EXPOSE 8080

CMD ["npm", "run", "start:dev"]