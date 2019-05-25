FROM node:10.15.0
WORKDIR /merida
COPY . /merida
RUN npm install
RUN npm run build
CMD ["npm", "run" "start"]