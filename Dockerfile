FROM node:19.0.0-alpine

WORKDIR /apptest

COPY package.json package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
