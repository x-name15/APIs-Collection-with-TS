FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY src/bin/entrypoint.sh /app/bin/entrypoint.sh

RUN chmod +x /app/bin/entrypoint.sh

EXPOSE 7000

CMD ["/app/bin/entrypoint.sh"]
