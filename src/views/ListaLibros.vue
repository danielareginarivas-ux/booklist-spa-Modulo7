<template>
  <section class="lista">
    <h1>Catálogo de libros</h1>

    <FormularioLibro
      :libro-editando="libroEditando"
      @agregar="agregarLibro"
      @actualizar="actualizarLibro"
      @cancelar="cancelarEdicion"
    />

    <div class="filtros">
     <v-text-field
  v-model.trim="busqueda"
  type="search"
  placeholder="Buscar por autor..."
  label="Buscar libro"
  variant="outlined"
  density="compact"
  hide-details
  class="filtros__input"
/>
      <select v-model="categoriaSeleccionada" class="filtros__select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categoriasDisponibles" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <button
        v-show="busqueda || categoriaSeleccionada"
        class="btn btn--secundario"
        @click="limpiarFiltros"
      >
        Limpiar filtros
      </button>
    </div>

    <p class="lista__contador">
    Mostrando {{ librosFiltrados.length }} de {{ libros.length }} libro(s)
    </p>

    <p class="lista__contador">
  {{ cantidadFavoritos === 1 ? '♥ 1 favorito' : `♥ ${cantidadFavoritos} favoritos` }}
  </p>

    <p v-if="loading" class="lista__vacio">
    Cargando libros...
    </p>

    <p v-else-if="error" class="lista__vacio">
        {{ error }}
    </p>
    

    <p v-else-if="librosFiltrados.length === 0" class="lista__vacio">
  No hay libros disponibles con esos filtros.
    </p>

    <div v-else class="lista__grid">
      <Libro
        v-for="libro in librosFiltrados"
        :key="libro.id"
        :libro="libro"
        :destacado="libroEditando && libroEditando.id === libro.id"
        @eliminar="eliminarLibro"
        @editar="iniciarEdicion"
      />
    </div>
  </section>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Libro from '../components/Libro.vue'
import FormularioLibro from '../components/FormularioLibro.vue'
import { libroStore } from '../data/libros'
import { useStore } from 'vuex'

const store = useStore()
const busqueda = computed({
  get: () => store.state.filtros.busqueda,
  set: valor => store.dispatch('filtros/actualizarBusqueda', valor)
})

const categoriaSeleccionada = computed({
  get: () => store.state.filtros.categoriaSeleccionada,
  set: valor => store.dispatch('filtros/actualizarCategoria', valor)
})
const libros = computed(() => store.state.libros.libros)
const loading = computed(() => store.state.libros.loading)
const error = computed(() => store.state.libros.error)


const categoriasDisponibles = computed(() =>
  [...new Set(libros.value.map(l => l.categoria))].sort()
)

const librosFiltrados = computed(
  () => store.getters['libros/librosFiltrados']
)

const cantidadFavoritos = computed(
  () => store.getters['favoritos/cantidadFavoritos']
)
   
  
 
const libroEditando = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await store.dispatch('libros/cargarLibros')
  const idAEditar = route.query.editar
  if (idAEditar) {
    const libro = libroStore.obtenerPorId(idAEditar)
    if (libro) libroEditando.value = libro
    router.replace({ path: '/libros' })
  }
})

async function agregarLibro(libro) {
  console.log('=== LIBRO RECIBIDO DEL FORMULARIO ===', libro)

  try {
    const resultado = await store.dispatch('libros/agregarLibro', libro)
    console.log('=== LIBRO GUARDADO ===', resultado)
  } catch (error) {
    console.error('=== ERROR AL AGREGAR ===', error)
  }
}

function iniciarEdicion(libro) {
  libroEditando.value = libro
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function actualizarLibro(id, datos) {
  try {
    await store.dispatch('libros/actualizarLibro', {
      id,
      datos
    })

    libroEditando.value = null
  } catch (error) {
    console.error('Error al actualizar el libro:', error)
  }
}

function cancelarEdicion() {
  libroEditando.value = null
}

async function eliminarLibro(id) {
  try {
    await store.dispatch('libros/eliminarLibro', id)

    if (libroEditando.value?.id === id) {
      libroEditando.value = null
    }
  } catch (error) {
    console.error('Error al eliminar el libro:', error)
  }
}

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

.filtros {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.filtros__input, .filtros__select {
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--color-borde);
  background: var(--color-superficie);
  color: var(--color-texto);
  font-family: inherit;
}

.lista__contador {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-texto-suave);
}

.lista__vacio {
  text-align: center;
  padding: 2rem;
  color: var(--color-texto-suave);
  border: 1px dashed var(--color-borde);
  border-radius: 12px;
}

.lista__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
