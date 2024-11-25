<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- El contenido renderizado cambiará según la ruta -->
    <router-view />
    <router-link to="/favorites">
      <button class="favorite-btn">Ir a Mis Favoritos</button>
    </router-link>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.favorite-btn {
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.favorite-btn:hover {
  background-color:#0056b3;
}
</style>