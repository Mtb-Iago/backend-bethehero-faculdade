FROM node:14

WORKDIR /usr/app/nodejs

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]