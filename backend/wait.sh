#!/bin/sh

set -e

while ! nc -z db 5432; do
  echo "🟡 Waiting for Postgres Database Startup (db 5432) ..."
  sleep 2
done

echo "✅ Postgres Database Started Successfully (db:5432)"