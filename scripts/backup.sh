#!/bin/sh
DB_NAME="generative_ai_app_db"
PG_USER="admin"

echo "📦 Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432; do
  sleep 1
done
echo "📦 Starting PostgreSQL backup..."
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
pg_dump -h postgres -U "$PG_USER"  "$DB_NAME" > /backups/backup_$TIMESTAMP.sql

echo "✅ Backup completed: /backups/backup_$TIMESTAMP.sql"
