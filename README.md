# BookList SPA — Proyecto Módulo 7

SPA de gestión de libros

## Requisitos de la consigna

- Añadir libros con título, autor y categoría.
- Formulario reactivo con `v-model`.
- Lista reactiva con eliminación.
- Vistas Inicio, Lista de libros y Detalle del libro.
- Rutas `/`, `/libros` y `/libros/:id`.
- Componentes reutilizables.
- `v-if`, `v-show`, `v-for`, `v-bind`.
- Eventos `@click`, `@submit.prevent`, `@keyup.enter` y `.once`.
- Edición de libros y filtros por autor/categoría.
- Inicio de sesión en `/login`.
- Dashboard / Panel de control** en `/dashboard`.
- Cierre de sesión mediante el botón "Cerrar sesión".
- Protección de rutas con un guard de Vue Router.
- Redirección automática al login cuando no existe una sesión.
- Redirección al Dashboard cuando un usuario ya autenticado intenta abrir `/login`.

## Acceso de demostración

Usuario: `admin`  
Contraseña: `123456`

La autenticación es local y está pensada para demostrar el flujo de interfaz solicitado; no representa un sistema de autenticación con backend.

## Estructura principal

```text
src/
├── App.vue
├── main.js
├── style.css
├── data/
│   ├── auth.js
│   ├── libros.js
│   └── usuario.js
├── components/
│   ├── Libro.vue
│   └── FormularioLibro.vue
├── views/
│   ├── LoginView.vue
│   ├── InicioView.vue
│   ├── DashboardView.vue
│   ├── ListaLibros.vue
│   └── DetalleLibro.vue
└── router/
    └── index.js
```

## Cómo ejecutar

```bash
npm install
npm run serve
```

Para ejecutar las pruebas unitarias:

```bash
npm run test:unit
```

Vue CLI mostrará la dirección local, normalmente `http://localhost:8080`.

Para producción:

```bash
npm run build
```

