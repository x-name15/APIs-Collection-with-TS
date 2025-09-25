FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y postgresql-client

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

COPY src/bin/entrypoint.sh /app/bin/entrypoint.sh

RUN chmod +x /app/bin/entrypoint.sh

EXPOSE 7000

CMD ["/app/bin/entrypoint.sh"]
