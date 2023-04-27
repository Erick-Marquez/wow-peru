## Prueba técnica WOW-PERÚ

## Aplicación Backend
La aplicación de backend ha sido desarrollado en el framework de laravel.
Primero se debe configurar el .env
-Solo modificar el acceso a la base de datos el resto dejarlo en default

Luego ejecutar los comandos
```bash
composer install
php artisan key:generate
php artisan migrate --seed

```

## Aplicación Fronted
La aplicación de fronted ha sido desarrollado con la libreria de react.

Ejecutar los comandos
```bash
npm install
npm start

```