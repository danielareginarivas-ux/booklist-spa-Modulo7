<template>
  <section class="lista">
    <h1>Catálogo de libros</h1>

    <FormularioLibro
      :libro-editando="libroEditando"
      @agregar="agregarLibro"
      @actualizar="actualizarLibro"
      @cancelar="cancelarEdicion"
    />

    <!-- Filtros -->
    <div class="filtros">
      <input
        v-model.trim="busqueda"
        type="search"
        placeholder="Buscar por autor..."
        aria-label="Buscar libro por autor"
        class="filtros__input"
      />

      <select
        v-model="categoriaSeleccionada"
        class="filtros__select"
      >
        <option value="">
          Todas las categorías
        </option>

        <option
          v-for="cat in categoriasDisponibles"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>

      <button
        v-show="busqueda || categoriaSeleccionada"
        class="btn btn--secundario"
        @click="limpiarFiltros"
      >
        Limpiar filtros
      </button>
    </div>

    <!-- Contadores -->
    <p class="lista__contador">
      Mostrando {{ librosFiltrados.length }} de
      {{ libros.length }} libro(s)
    </p>

    <p class="lista__contador">
      {{
        cantidadFavoritos === 1
          ? '♥ 1 favorito'
          : `♥ ${cantidadFavoritos} favoritos`
      }}
    </p>

    <!-- Estados -->
    <p
      v-if="loading"
      class="lista__vacio"
    >
      Cargando libros...
    </p>

    <p
      v-else-if="error"
      class="lista__vacio"
    >
      {{ error }}
    </p>

    <p
      v-else-if="librosFiltrados.length === 0"
      class="lista__vacio"
    >
      No hay libros disponibles con esos filtros.
    </p>

    <!-- Lista de libros -->
    <div
      v-else
      class="lista__grid"
    >
      <Libro
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        :destacado="
          libroEditando &&
          libroEditando.id === libro.id
        "
        @eliminar="eliminarLibro"
        @editar="iniciarEdicion"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Libro from '../components/Libro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'
import { libroStore } from '../data/libros'

const store = useStore()
const route = useRoute()
const router = useRouter()

const libroEditando = ref(null)

/* =========================
   FILTRO POR AUTOR
========================= */

const busqueda = computed({
  get: () => store.state.filtros.busqueda,

  set: valor =>
    store.dispatch(
      'filtros/actualizarBusqueda',
      valor
    )
})

/* =========================
   FILTRO POR CATEGORÍA
========================= */

const categoriaSeleccionada = computed({
  get: () =>
    store.state.filtros.categoriaSeleccionada,

  set: valor =>
    store.dispatch(
      'filtros/actualizarCategoria',
      valor
    )
})

/* =========================
   ESTADO DE LIBROS
========================= */

const libros = computed(
  () => store.state.libros.libros
)

const loading = computed(
  () => store.state.libros.loading
)

const error = computed(
  () => store.state.libros.error
)

/* =========================
   LIBROS FILTRADOS
========================= */

const librosFiltrados = computed(
  () => store.getters['libros/librosFiltrados']
)

/* =========================
   CATEGORÍAS DISPONIBLES
========================= */

const categoriasDisponibles = computed(() => {
  return [
    ...new Set(
      libros.value
        .map(libro => libro.categoria)
        .filter(Boolean)
    )
  ].sort()
})

/* =========================
   FAVORITOS
========================= */

const cantidadFavoritos = computed(
  () =>
    store.getters[
      'favoritos/cantidadFavoritos'
    ]
)

/* =========================
   CARGA INICIAL
========================= */

onMounted(async () => {
  await store.dispatch('libros/cargarLibros')

  const idAEditar = route.query.editar

  if (idAEditar) {
    const libro =
      libroStore.obtenerPorId(idAEditar)

    if (libro) {
      libroEditando.value = libro
    }

    router.replace({
      path: '/libros'
    })
  }
})

/* =========================
   AGREGAR LIBRO
========================= */

async function agregarLibro(libro) {
  try {
    await store.dispatch(
      'libros/agregarLibro',
      libro
    )
  } catch (error) {
    console.error(
      'Error al agregar el libro:',
      error
    )
  }
}

/* =========================
   INICIAR EDICIÓN
========================= */

function iniciarEdicion(libro) {
  libroEditando.value = libro

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/* =========================
   ACTUALIZAR LIBRO
========================= */

async function actualizarLibro(id, datos) {
  try {
    await store.dispatch(
      'libros/actualizarLibro',
      {
        id,
        datos
      }
    )

    libroEditando.value = null
  } catch (error) {
    console.error(
      'Error al actualizar el libro:',
      error
    )
  }
}

/* =========================
   CANCELAR EDICIÓN
========================= */

function cancelarEdicion() {
  libroEditando.value = null
}

/* =========================
   ELIMINAR LIBRO
========================= */

async function eliminarLibro(id) {
  try {
    await store.dispatch(
      'libros/eliminarLibro',
      id
    )

    if (libroEditando.value?.id === id) {
      libroEditando.value = null
    }
  } catch (error) {
    console.error(
      'Error al eliminar el libro:',
      error
    )
  }
}

/* =========================
   LIMPIAR FILTROS
========================= */

function limpiarFiltros() {
  busqueda.value = ''
  categoriaSeleccionada.value = ''
}
</script>

<style scoped>
.lista {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* =========================
   FILTROS
========================= */

.filtros {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: center;
}

.filtros__input,
.filtros__select {
  padding: 0.65rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--color-borde);
  background: var(--color-superficie);
  color: var(--color-texto);
  font-family: inherit;
  font-size: 0.95rem;
  min-height: 42px;
  box-sizing: border-box;
}

.filtros__input {
  flex: 1 1 280px;
  min-width: 220px;
}

.filtros__select {
  flex: 0 1 220px;
}

.filtros__input:focus,
.filtros__select:focus {
  outline: 2px solid var(--color-primario);
  outline-offset: 1px;
}

/* =========================
   CONTADORES
========================= */

.lista__contador {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-texto-suave);
}

/* =========================
   ESTADOS
========================= */

.lista__vacio {
  text-align: center;
  padding: 2rem;
  color: var(--color-texto-suave);
  border: 1px dashed var(--color-borde);
  border-radius: 12px;
}

/* =========================
   GRID DE LIBROS
========================= */

.lista__grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

/* =========================
   RESPONSIVO
========================= */

@media (max-width: 600px) {
  .filtros {
    flex-direction: column;
    align-items: stretch;
  }

  .filtros__input,
  .filtros__select {
    width: 100%;
    min-width: 0;
    flex: none;
  }
}
</style>