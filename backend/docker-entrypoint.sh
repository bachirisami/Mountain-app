#!/bin/bash
set -e

# Run migrations and seed
php artisan migrate:fresh --seed

# Fix permissions
chown -R www-data:www-data storage bootstrap/cache

# Start Laravel
php artisan serve --host=0.0.0.0 --port=9000
