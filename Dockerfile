FROM node:10.15.0
WORKDIR /merida
COPY . /merida
RUN npm install
RUN npm run build

EXPOSE 3002

CMD npm run start
