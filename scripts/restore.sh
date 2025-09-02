#!/bin/sh

DB_NAME="generative_ai_app_db"
PG_USER="admin"
BACKUP_FILE="/backups/backup_20250808_045508.sql"

echo "📦 Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432; do
  sleep 1
done
echo "📦 Starting PostgreSQL restore..."
psql -h postgres -U "$PG_USER" -d "$DB_NAME" -f "$BACKUP_FILE"
echo "✅ Restore completed: "$BACKUP_FILE""
