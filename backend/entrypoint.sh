 
#!/bin/bash
APP_PORT=${PORT:-8000}
echo "Waiting for PostgreSQL to be available..."

 
  sleep 20
 

echo "PostgreSQL started"

echo "Migrating database..."
python /app/manage.py migrate --noinput
echo "Database migrated"

echo "Collecting static files..."
python /app/manage.py collectstatic --noinput
echo "Static files collected"

echo "Starting server..."
exec gunicorn project.wsgi:application --bind "0.0.0.0:${APP_PORT}"
