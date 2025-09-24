#!/bin/sh
echo "Esperando a PostgreSQL..."

# Espera hasta que la DB acepte conexiones
until pg_isready -h db -p 5432 -U "$POSTGRES_USER"; do
  echo "PostgreSQL no disponible aún, esperando 2s..."
  sleep 2
done

echo "PostgreSQL listo!"

# Genera Prisma Client
npx prisma generate --schema=./src/database/prisma/schema.prisma

# Aplica migraciones
npx prisma migrate deploy --schema=./src/database/prisma/schema.prisma

# Inicia el servidor
npm run start
