FROM node:15.5.0-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package.json package-lock.json /usr/src/app/
RUN npm install --production

COPY . /usr/src/app

CMD npm run build
