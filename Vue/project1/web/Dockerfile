FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production && npm i -g @nestjs/cli

EXPOSE 3001

CMD npm run start