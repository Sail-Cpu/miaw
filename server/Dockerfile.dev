FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./prisma ./prisma 

RUN npx prisma generate

COPY . .

EXPOSE 3005

CMD ["npm", "run", "devStart"]