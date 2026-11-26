# Mixtlis en la Montaña

Recreación adaptable de la página de inicio de Mixtlis en Angular 21. Las imágenes de marca y de las rutas están optimizadas y se sirven localmente desde `public/assets/images`.

## Agregar una aventura

El componente `src/app/adventures/` lee `src/app/data/adventures.json`. Para agregar una ruta, añade un objeto al arreglo; cada aventura debe tener un `id` único y los siguientes datos:

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

## Editar senderos

La página `/senderos` usa el componente `src/app/senderos/` y los datos de `src/app/data/senderos.json`. Sus tarjetas siguen la misma estructura y diseño de detalles que la página Montaña; actualiza las imágenes en `public/assets/images`.

El calendario descargable se sirve desde `public/app/data/calendario.pdf`; al actualizar el archivo fuente `src/app/data/calendario.pdf`, reemplaza también la copia pública.

## Editar el menú

Edita `src/app/data/navigation.json` para cambiar, agregar o quitar elementos del menú. Cada elemento debe tener un `id` único, el texto `label` y el destino `href` (por ejemplo, `#aventuras`).

## Editar redes sociales

Edita `src/app/data/social-links.json` para agregar o modificar los perfiles sociales. Cada objeto contiene un `id` (`facebook`, `instagram` o `tiktok`), `label` y `url`.

## Editar la sección More

El componente `src/app/more/` muestra los teléfonos, WhatsApp y horarios de atención definidos en `src/app/data/more.json`. Actualiza esos datos en el JSON para cambiar la información de contacto.

## Editar los niveles de dificultad

Edita `src/app/data/difficulty-levels.json` para cambiar o agregar niveles. Cada objeto contiene `number`, `title`, `description`, `mascot`, `ratingImage`, `ratingLabel` y `countLabel`. Las imágenes deben existir en `public/assets/images`.

## Editar actividades de montaña

El componente `src/app/montana/` muestra las experiencias definidas en `src/app/data/montana.json`, incluidas sus imágenes. La opción Montaña abre la ruta independiente `/montana`, manteniendo el encabezado y el pie de página. Las secciones de datos técnicos, puntos de encuentro, costos y notas se muestran cuando esos datos están disponibles.

## Editar experiencias familiares

El componente `src/app/familia/` muestra las experiencias de `src/app/data/familia.json` con la misma estructura de tarjetas y búsqueda que Montaña. La opción Familiar abre `/familia`, conservando el encabezado y el pie de página.

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
