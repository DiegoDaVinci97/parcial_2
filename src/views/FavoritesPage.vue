<template>
  <div>
    <h1>Mis Favoritos</h1>

    <div v-if="favorites.length === 0">
      <p>No tienes películas en tus favoritos.</p>
    </div>

    <div v-if="favorites.length > 0">
      <ul>
        <li v-for="favorite in favorites" :key="favorite.id">
          <h2>{{ favorite.title }}</h2>
          <img :src="'https://image.tmdb.org/t/p/w500' + favorite.poster_path" alt="Favorite Movie Poster"/>
          <p>{{ favorite.overview }}</p>
          <router-link :to="'/movie/' + favorite.id">Ver detalles</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FavoritesPage',  // Debe ser 'FavoritesPage' y no 'Favorites'
  data() {
    return {
      favorites: [],  // Lista de películas favoritas
    };
  },
  methods: {
    loadFavorites() {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    },
  },
  mounted() {
    this.loadFavorites();  // Cargar las películas favoritas cuando se monta la página
  },
};
</script>

<style scoped>
/* Estilo general para la página */
h1 {
  text-align: center;
  font-size: 2rem;
  margin: 20px 0;
  color: #333;
}

p {
  color: #666;
  font-size: 1rem;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* Estilo para cada tarjeta de película */
li {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Imagen de la película */
img {
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
}

/* Estilo para el enlace */
a {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

a:hover {
  background-color: #0056b3;
}

/* Grid para películas en pantallas grandes */
div > ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
  align-items: flex-start;
}

/* Ajustes responsivos */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  li {
    padding: 10px;
  }

  img {
    max-width: 150px;
  }

  a {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}
</style>
