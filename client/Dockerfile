FROM node:16.10.0-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:16.10.0-alpine

WORKDIR /app

COPY package.json ./
RUN npm install
COPY --from=0 /app .

EXPOSE 3000
CMD ["npm", "start"]