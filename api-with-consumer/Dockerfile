FROM node:20

WORKDIR /app

COPY package*.json tsconfig*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y netcat-openbsd

RUN chmod +x /app/src/bin/entrypoint.sh

RUN chmod +x /app/consumer/bin/consumer_entrypoint.sh

EXPOSE 7000 7001


CMD ["/app/src/bin/entrypoint.sh"]
