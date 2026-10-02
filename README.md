# 📚 BookList SPA

Aplicación web desarrollada con **Vue 3** como proyecto del **Módulo 7 – Desarrollo de Aplicaciones Front-End con Framework Vue**.

BookList es una SPA (Single Page Application) para la gestión de un catálogo de libros. La aplicación permite visualizar, buscar, filtrar, agregar, editar y eliminar libros, además de gestionar favoritos.

El proyecto integra consumo de una API REST, gestión global del estado con Vuex, pruebas automatizadas y una librería de interfaz de usuario.

---

## 🚀 Funcionalidades

- Inicio de sesión.
- Navegación mediante Vue Router.
- Visualización del catálogo de libros.
- Consulta de datos desde una API REST.
- Registro de nuevos libros.
- Edición de libros existentes.
- Eliminación de libros.
- Búsqueda por autor.
- Filtro por categoría.
- Gestión de favoritos.
- Estados de carga, error y lista vacía.
- Gestión global del estado con Vuex.
- Tema claro y oscuro.
- Diseño responsive.
- Pruebas unitarias.
- Prueba end-to-end.
- Integración de Vuetify.

---

## 🛠️ Tecnologías utilizadas

- Vue 3
- Vue CLI
- Vue Router
- Vuex 4
- Axios
- JSON Server
- Vuetify 3
- Jest
- Vue Test Utils
- Cypress
- JavaScript
- HTML5
- CSS3
- Git
- GitHub

---

## 🧩 Arquitectura del proyecto

El proyecto está organizado en componentes, vistas, servicios, módulos de estado y pruebas.

```text
src/
├── components/
│   ├── FormularioLibro.vue
│   └── Libro.vue
│
├── data/
│   ├── auth.js
│   ├── libros.js
│   └── usuario.js
│
├── plugins/
│   └── vuetify.js
│
├── router/
│   └── index.js
│
├── services/
│   ├── api.js
│   └── booksService.js
│
├── store/
│   ├── index.js
│   └── modules/
│       ├── libros.js
│       ├── filtros.js
│       └── favoritos.js
│
├── views/
│   ├── DashboardView.vue
│   ├── DetalleLibro.vue
│   ├── InicioView.vue
│   ├── ListaLibros.vue
│   └── LoginView.vue
│
├── App.vue
├── main.js
└── style.css
```

Las pruebas se encuentran organizadas en:

```text
tests/unit/
├── Libro.spec.js
└── ListaLibros.spec.js

cypress/e2e/
└── filtro-libros.cy.js
```

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/danielareginarivas-ux/booklist-spa-Modulo7.git
```

### 2. Ingresar al proyecto

```bash
cd booklist-spa-Modulo7
```

### 3. Instalar las dependencias

```bash
npm install
```

---

## ▶️ Ejecutar el proyecto

La aplicación necesita dos procesos: la aplicación Vue y la API mock.

### Terminal 1 — iniciar la API

```bash
npm run mock
```

JSON Server estará disponible en:

```text
http://localhost:3001
```

Los libros pueden consultarse mediante:

```text
GET /books
```

### Terminal 2 — iniciar Vue

```bash
npm run serve
```

Vue CLI mostrará la dirección local de la aplicación, normalmente:

```text
http://localhost:8080
```

---

## 🔌 API REST

La aplicación utiliza **Axios** para comunicarse con una API REST simulada mediante **JSON Server**.

Las operaciones principales son:

```text
GET    /books
POST   /books
PUT    /books/:id
DELETE /books/:id
```

La comunicación con la API está separada de los componentes mediante:

```text
src/services/api.js
src/services/booksService.js
```

Esta separación facilita el mantenimiento del proyecto y permite sustituir la API mock por una API real en el futuro.

---

## 🗃️ Gestión del estado con Vuex

El estado global está organizado en tres módulos:

### `libros`

Gestiona:

- listado de libros;
- carga de datos;
- errores;
- creación;
- actualización;
- eliminación.

### `filtros`

Gestiona:

- texto de búsqueda;
- categoría seleccionada.

### `favoritos`

Gestiona los libros seleccionados como favoritos.

El consumo de la API se realiza mediante **actions de Vuex**, mientras que los **getters** permiten obtener los libros filtrados.

Esta arquitectura evita concentrar toda la lógica en los componentes y facilita la escalabilidad de la aplicación.

---

## 🎨 Interfaz de usuario

El proyecto utiliza **Vuetify 3** como librería complementaria de interfaz.

Vuetify fue integrado al proyecto y se utiliza, entre otros elementos, en el campo de búsqueda del catálogo mediante `v-text-field`.

La aplicación también incluye estilos propios para conservar la identidad visual de BookList.

Se implementaron:

- diseño responsive;
- adaptación para tablet y dispositivos móviles;
- tema claro;
- tema oscuro;
- navegación responsive;
- componentes visuales reutilizables.

---

## 🌙 Tema claro y oscuro

Desde el encabezado de la aplicación el usuario puede alternar entre los temas claro y oscuro.

El tema utiliza variables CSS para adaptar elementos como:

- fondo;
- superficies;
- textos;
- bordes;
- colores principales.

Esto permite mantener una interfaz consistente en ambos modos.

---

## 🧪 Pruebas

El proyecto incorpora pruebas unitarias y end-to-end para validar funcionalidades importantes.

### Pruebas unitarias

Ejecutar:

```bash
npm run test:unit
```

Se implementaron dos pruebas principales:

**`Libro.spec.js`**

Comprueba el renderizado correcto del componente que representa un libro.

**`ListaLibros.spec.js`**

Comprueba la respuesta visual de la aplicación cuando ocurre un error al cargar datos desde la API.

---

## 🌐 Prueba E2E con Cypress

Para ejecutar Cypress, primero deben estar funcionando la aplicación Vue y JSON Server.

Después:

```bash
npx cypress open
```

Ejecutar:

```text
filtro-libros.cy.js
```

La prueba simula un flujo real del usuario:

1. inicia sesión;
2. accede al catálogo;
3. busca un libro por autor;
4. visualiza el resultado correspondiente;
5. comprueba que los libros que no coinciden con el filtro dejan de mostrarse.

---

## 🔐 Acceso de demostración

Para probar la aplicación:

```text
Usuario: admin
Contraseña: 123456
```

Estas credenciales pertenecen únicamente al entorno demostrativo del proyecto.

---

## 💡 Decisiones técnicas

### ¿Por qué Vue 3?

Vue permite construir una SPA mediante componentes reutilizables y mantener separadas las diferentes responsabilidades de la aplicación.

El proyecto utiliza Composition API en diferentes componentes mediante herramientas como:

```javascript
ref()
computed()
onMounted()
```

### ¿Por qué Vuex?

Vuex permite centralizar el estado compartido entre los componentes.

Se separó el estado en módulos de libros, filtros y favoritos para evitar una estructura monolítica y facilitar futuras ampliaciones.

### ¿Por qué Axios?

Axios simplifica la comunicación HTTP y permite centralizar la configuración de acceso a la API.

### ¿Por qué JSON Server?

JSON Server permite disponer de una API REST durante el desarrollo sin necesitar un backend completo.

Esto permite trabajar y probar operaciones CRUD mediante GET, POST, PUT y DELETE.

### ¿Por qué Vuetify?

Vuetify proporciona componentes de interfaz reutilizables y consistentes para Vue.

Se incorporó manteniendo parte del CSS propio del proyecto para combinar una librería profesional de UI con la identidad visual existente de BookList.

### ¿Por qué Jest y Vue Test Utils?

Permiten comprobar de forma aislada el comportamiento de los componentes y detectar errores durante el desarrollo.

### ¿Por qué Cypress?

Cypress permite probar la aplicación desde la perspectiva del usuario, verificando un flujo completo en el navegador.

---

## 📱 Diseño responsive

La aplicación adapta su interfaz según el tamaño de la pantalla.

Se implementaron breakpoints específicos para reorganizar:

- encabezado;
- navegación;
- información del usuario;
- contenido principal.

Esto permite utilizar BookList tanto en escritorio como en pantallas más pequeñas.

---

## 📦 Build de producción

Para generar una versión optimizada:

```bash
npm run build
```

Los archivos de producción serán generados en:

```text
dist/
```

---

## 📌 Proyecto académico

Proyecto desarrollado como parte del:

**Módulo 7 – Desarrollo de Aplicaciones Front-End con Framework Vue**

El objetivo es demostrar conocimientos de:

- desarrollo de SPA con Vue;
- arquitectura basada en componentes;
- consumo de API REST;
- gestión global del estado;
- pruebas unitarias y E2E;
- librerías de UI;
- diseño responsive;
- documentación técnica.

---

## 👩‍💻 Autora

**Daniela Agondi**

Desarrollo Front-End · Vue · JavaScript