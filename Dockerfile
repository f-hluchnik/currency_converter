FROM node:16.0.0-alpine

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./

COPY src ./src
COPY db ./db
RUN npm install
RUN npm run build

FROM node:16.0.0-alpine
WORKDIR /usr

COPY package.json ./
RUN npm install
COPY --from=0 /usr .
RUN npm install pm2 -g
EXPOSE 7654
CMD ["pm2-runtime","npm run start"]