#!/bin/sh
echo "Esperando a PostgreSQL..."
until pg_isready -h db -p 5432 -U "$POSTGRES_USER"; do
  echo "PostgreSQL no disponible aún, esperando 2s..."
  sleep 2
done
echo "PostgreSQL listo!"

npx prisma generate --schema=./src/database/prisma/schema.prisma
npx prisma migrate deploy --schema=./src/database/prisma/schema.prisma

npx nodemon -L
