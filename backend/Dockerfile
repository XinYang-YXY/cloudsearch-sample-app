FROM node:lts-alpine3.12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN touch .env

COPY . /usr/src/app

EXPOSE 8080

CMD ["npm", "run", "live"]