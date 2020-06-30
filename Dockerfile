FROM node:10.16.3

WORKDIR /agora-vue-template

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

COPY config/ossutil.conf .
ADD http://gosspublic.alicdn.com/ossutil/1.6.11/ossutil64 .
RUN chmod +x ossutil64
RUN ./ossutil64 cp -r dist oss://agora-web-cdn/agora-vue-template -c ./ossutil.conf -u
