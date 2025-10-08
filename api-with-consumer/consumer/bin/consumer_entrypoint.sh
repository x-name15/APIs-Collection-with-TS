#!/bin/sh
RABBIT_HOST=${RABBIT_HOST:-rabbitmq}
RABBIT_PORT=${RABBIT_PORT:-5672}

echo "Waking up the rabbit at $RABBIT_HOST:$RABBIT_PORT..."
while ! nc $RABBIT_HOST $RABBIT_PORT; do
  sleep 2
done
echo "the Rabbit has woken up, lets get some chamba"
cd /app/consumer
npx nodemon --config /app/consumer/nodemon.json -L