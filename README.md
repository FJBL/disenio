# Mixtlis en la Montaña

Recreación adaptable de la página de inicio de Mixtlis en Angular 21. Las imágenes de marca y de las rutas están optimizadas y se sirven localmente desde `public/assets/images`.

## Agregar una aventura

El componente `src/app/adventures/` lee `src/app/adventures.json`. Para agregar una ruta, añade un objeto al arreglo; cada aventura debe tener un `id` único y los siguientes datos:

```json
{
  "id": "ruta-nueva",
  "name": "Nombre de la ruta",
  "date": "FECHA",
  "level": "Nivel de dificultad",
  "image": "assets/images/ruta-nueva.webp",
  "link": "https://ejemplo.com/ruta",
  "status": "DISPONIBLE",
  "distance": "12 km",
  "elevation": "800 m D+",
  "duration": "1 día"
}
```

Guarda la imagen en `public/assets/images` y usa su ruta desde `assets/images`. Después, ejecuta `npm start` para revisarla o vuelve a publicar la aplicación para que el cambio aparezca en el sitio público.

## Editar el menú

Edita `src/app/navigation.json` para cambiar, agregar o quitar elementos del menú. Cada elemento debe tener un `id` único, el texto `label` y el destino `href` (por ejemplo, `#aventuras`).

## Editar los niveles de dificultad

Edita `src/app/difficulty-levels.json` para cambiar o agregar niveles. Cada objeto contiene `number`, `title`, `description`, `mascot`, `ratingImage`, `ratingLabel` y `countLabel`. Las imágenes deben existir en `public/assets/images`.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Desarrollo

```bash
npm install
npm start
```

Abre `http://localhost:4200/`. La aplicación recarga los cambios automáticamente.

## Verificación

```bash
npm run build
npm test -- --watch=false
```

El formulario de contacto muestra confirmación local; para recibir mensajes necesita conectarse a un servicio. La invitación del Clan abre el canal de WhatsApp.
