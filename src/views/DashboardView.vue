<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <div>
        <p class="dashboard__eyebrow">Panel de control</p>
        <h1>Dashboard</h1>
        <p>Bienvenido/a, <strong>{{ nombreUsuario }}</strong>.</p>
      </div>
      <router-link to="/libros" class="btn btn--primario">Gestionar libros</router-link>
    </div>

    <div class="dashboard__stats">
      <article class="stat">
        <span>📚 Libros</span>
        <strong>{{ totalLibros }}</strong>
      </article>
      <article class="stat">
        <span>✍️ Autores</span>
        <strong>{{ totalAutores }}</strong>
      </article>
      <article class="stat">
        <span>🏷️ Categorías</span>
        <strong>{{ totalCategorias }}</strong>
      </article>
    </div>

    <div class="dashboard__grid">
      <article class="dashboard__panel">
        <h2>Acciones rápidas</h2>
        <div class="dashboard__actions">
          <router-link to="/libros" class="action">➕ Añadir o editar libros</router-link>
          <router-link to="/" class="action">🏠 Ir a Inicio</router-link>
        </div>
      </article>

      <article class="dashboard__panel">
        <h2>Resumen</h2>
        <p>
          BookList es una aplicación para organizar y gestionar un catálogo de libros de forma sencilla. 
          Permite registrar nuevos libros, consultar la colección, editar y eliminar registros, 
          buscar libros por autor, filtrar por categoría y marcar libros como favoritos. 
          Su interfaz está diseñada para facilitar la navegación y ofrecer una experiencia 
          clara y práctica para el usuario.
        </p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { libroStore } from '../data/libros'
import { authStore } from '../data/auth'

const nombreUsuario = computed(() => authStore.usuario || 'Usuario')

const totalLibros = computed(() => libroStore.libros.length)
const totalAutores = computed(() => new Set(libroStore.libros.map(libro => libro.autor)).size)
const totalCategorias = computed(() => new Set(libroStore.libros.map(libro => libro.categoria)).size)
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.dashboard__header h1 {
  margin: 0.15rem 0 0.35rem;
}

.dashboard__header p:last-child {
  margin: 0;
  color: var(--color-texto-suave);
}

.dashboard__eyebrow {
  margin: 0;
  color: var(--color-primario);
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat,
.dashboard__panel {
  background: var(--color-superficie);
  border: 1px solid var(--color-borde);
  border-radius: 14px;
  padding: 1.25rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat span {
  color: var(--color-texto-suave);
  font-size: 0.9rem;
}

.stat strong {
  font-size: 2rem;
  color: var(--color-primario);
}

.dashboard__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.dashboard__panel h2 {
  margin-top: 0;
  font-size: 1.1rem;
}

.dashboard__panel p {
  color: var(--color-texto-suave);
  line-height: 1.6;
}

.dashboard__actions {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.action {
  padding: 0.8rem;
  border-radius: 8px;
  background: var(--color-primario-suave);
  color: var(--color-primario);
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 720px) {
  .dashboard__header,
  .dashboard__grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .dashboard__stats {
    grid-template-columns: 1fr;
  }
}
</style>
