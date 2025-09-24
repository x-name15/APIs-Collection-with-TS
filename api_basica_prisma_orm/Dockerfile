FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 7000

CMD ["/entrypoint.sh"]
