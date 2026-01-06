FROM node:24-alpine3.21

WORKDIR /app

COPY package*.json .

RUN npm i .

COPY . .

EXPOSE 2907

CMD ["npm", "start"]