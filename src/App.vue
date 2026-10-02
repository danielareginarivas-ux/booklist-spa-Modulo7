<template>
  <div
    class="app"
    :class="{ 'app--oscuro': temaOscuro }"
  >
    <header v-if="estaAutenticado" class="app__header">
      <router-link to="/" class="app__logo">
        📚 BookList
      </router-link>

      <nav class="app__nav" aria-label="Navegación principal">
        <router-link
          to="/"
          exact-active-class="app__nav-link--activo"
        >
          Inicio
        </router-link>

        <router-link
          to="/dashboard"
          active-class="app__nav-link--activo"
        >
          Dashboard
        </router-link>

        <router-link
          to="/libros"
          active-class="app__nav-link--activo"
        >
          Libros
        </router-link>
      </nav>

      <div class="app__usuario">
        <span>👤 {{ nombreUsuario }}</span>

        <button
          class="btn-tema"
          type="button"
          :title="temaOscuro ? 'Activar tema claro' : 'Activar tema oscuro'"
          @click="alternarTema"
        >
          {{ temaOscuro ? '☀️' : '🌙' }}
        </button>

        <button
          class="btn btn--secundario btn--pequeno"
          @click="salir"
        >
          Cerrar sesión
        </button>
      </div>
    </header>

    <main
      :class="{
        'app__main': estaAutenticado,
        'app__main--login': !estaAutenticado
      }"
    >
      <router-view />
    </main>

    <footer
      v-if="estaAutenticado"
      class="app__footer"
    >
      <p>BookList SPA · Editorial Dany Agondi</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore, cerrarSesion } from './data/auth'

const router = useRouter()

const estaAutenticado = computed(() => authStore.autenticado)
const nombreUsuario = computed(() => authStore.usuario || 'Usuario')

const temaOscuro = ref(false)

function alternarTema() {
  temaOscuro.value = !temaOscuro.value
}

function salir() {
  cerrarSesion()
  router.push('/login')
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background: var(--color-fondo);
  color: var(--color-texto);

  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

/* =========================
   TEMA OSCURO
   ========================= */

.app--oscuro {
  --color-fondo: #121212;
  --color-superficie: #1e1e1e;
  --color-texto: #f5f5f5;
  --color-texto-suave: #bdbdbd;
  --color-borde: #3a3a3a;
  --color-primario: #90caf9;
  --color-primario-suave: #263b4d;
}

/* =========================
   HEADER
   ========================= */

.app__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;

  border-bottom: 1px solid var(--color-borde);
  background: var(--color-superficie);

  position: sticky;
  top: 0;
  z-index: 10;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

.app__logo {
  font-weight: 800;
  font-size: 1.2rem;
  text-decoration: none;
  color: var(--color-texto);
}

/* =========================
   NAVEGAÇÃO
   ========================= */

.app__nav {
  display: flex;
  gap: 1.25rem;
}

.app__nav a {
  text-decoration: none;
  color: var(--color-texto-suave);
  font-weight: 600;
  padding-bottom: 0.2rem;
  border-bottom: 2px solid transparent;
}

.app__nav a:hover {
  color: var(--color-texto);
}

.app__nav-link--activo {
  color: var(--color-primario) !important;
  border-bottom-color: var(--color-primario);
}

/* =========================
   USUÁRIO
   ========================= */

.app__usuario {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.85rem;
}

/* Botão claro / escuro */

.btn-tema {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  padding: 0;
  border-radius: 50%;
  border: 1px solid var(--color-borde);

  background: var(--color-superficie);
  color: var(--color-texto);

  font-size: 1.1rem;
  cursor: pointer;

  transition:
    transform 0.2s ease,
    background-color 0.25s ease;
}

.btn-tema:hover {
  transform: scale(1.08);
}

.btn--pequeno {
  padding: 0.4rem 0.7rem;
}

/* =========================
   CONTEÚDO
   ========================= */

.app__main {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
}

.app__main--login {
  flex: 1;
}

/* =========================
   FOOTER
   ========================= */

.app__footer {
  text-align: center;
  padding: 1.2rem;
  font-size: 0.8rem;

  color: var(--color-texto-suave);
  border-top: 1px solid var(--color-borde);
  background: var(--color-superficie);

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;
}

/* =========================
   RESPONSIVIDADE
   ========================= */

@media (max-width: 820px) {
  .app__header {
    flex-wrap: wrap;
    padding: 1rem;
  }

  .app__nav {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .app__usuario {
    margin-left: auto;
  }
}

@media (max-width: 520px) {
  .app__header {
    gap: 0.8rem;
  }

  .app__usuario {
    width: 100%;
    justify-content: flex-end;
  }

  .app__nav {
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .app__main {
    padding: 1.25rem 1rem;
  }
}
</style>