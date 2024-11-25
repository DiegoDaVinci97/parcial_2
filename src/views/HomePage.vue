<template>
  <div>
    <h1>Películas Populares</h1>

    <!-- Filtro por género -->
    <select v-model="selectedGenre" @change="fetchMovies">
      <option value="">Seleccionar género</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
    </select>

    <!-- Barra de búsqueda -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar película..."
      @input="searchMovies"
    />

    <!-- Si está cargando, mostramos un mensaje -->
    <div v-if="loading">Cargando...</div>

    <!-- Si hay resultados, mostramos las películas -->
    <div v-if="movies.length">
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <h2>{{ movie.title }}</h2>
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="MoviePoster" />
          <router-link :to="'/movie/' + movie.id">
            <button>Ver detalles</button>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Si no hay resultados, mostramos un mensaje -->
    <div v-if="movies.length === 0 && !loading">
      <p>No se encontraron películas.</p>
    </div>
  </div>
</template>

<script>
// Importa el servicio para interactuar con la API de TMDb
import movieApi from '../services/movieApi';

export default {
  data() {
    return {
      searchQuery: '', // Almacena la consulta de búsqueda
      movies: [],      // Almacena las películas obtenidas
      loading: false,  // Bandera para saber si se está cargando la información
      selectedGenre: '', // Almacena el género seleccionado para filtrar
      genres: [], // Almacena los géneros disponibles
    };
  },
  methods: {
    // Obtiene los géneros disponibles al cargar la página
    async fetchGenres() {
      const genresData = await movieApi.getGenres();
      this.genres = genresData;
    },

    // Obtiene las películas populares al cargar la página
    async fetchPopularMovies() {
      this.loading = true;
      this.movies = await movieApi.getPopularMovies(); // Llama al servicio para obtener las películas populares
      this.loading = false;
    },

    // Realiza la búsqueda de películas según la consulta del usuario
    async searchMovies() {
      if (this.searchQuery) {
        this.movies = await movieApi.searchMovies(this.searchQuery); // Llama al servicio para buscar películas
      } else {
        this.fetchMovies(); // Si la consulta está vacía, mostramos las populares
      }
    },

    // Filtra las películas por género
    async fetchMovies() {
      this.loading = true;
      if (this.selectedGenre) {
        this.movies = await movieApi.getMoviesByGenre(this.selectedGenre); // Llama al servicio para obtener las películas por género
      } else {
        this.movies = await movieApi.getPopularMovies(); // Si no se selecciona género, obtenemos las populares
      }
      this.loading = false;
    },

    // Redirige a la página de detalles de la película seleccionada
    viewDetails(id) {
      this.$router.push({ name: 'movie-details', params: { id } });
    },
  },
  mounted() {
    this.fetchGenres(); // Carga los géneros disponibles cuando la página se monta
    this.fetchPopularMovies(); // Carga las películas populares cuando la página se monta
  },
};
</script>

<style scoped>
/* Estilos generales */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

/* Contenedor principal */
div {
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Título */
h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

/* Filtro de género */
select {
  padding: 10px 15px;
  font-size: 16px;
  margin: 0 auto 20px auto;
  width: 50%;
  max-width: 300px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

select:hover {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

select:focus {
  outline: none;
  border-color: #0056b3;
}

/* Barra de búsqueda */
input {
  padding: 12px 20px;
  font-size: 16px;
  width: 50%;
  max-width: 400px;
  margin: 0 auto 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

input:hover, input:focus {
  border-color: #007bff;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
}

input::placeholder {
  color: #888;
}

/* Cargando mensaje */
div > .loading {
  font-size: 1.2rem;
  color: #007bff;
  font-weight: 500;
}

/* Lista de películas */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

li {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Imagen de la película */
img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

/* Título de la película */
h2 {
  font-size: 1.2rem;
  color: #333;
  margin: 10px 0;
  font-weight: 600;
}

/* Botón de ver detalles */
button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

/* Mensaje de no encontrado */
p {
  font-size: 1.2rem;
  color: #555;
}

/* Estilos para pantallas más pequeñas */
@media (max-width: 768px) {
  input, select {
    width: 80%;
  }

  ul {
    grid-template-columns: 1fr 1fr;
  }

  h1 {
    font-size: 2rem;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  input, select {
    width: 90%;
  }

  ul {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 1.5rem;
  }

  button {
    padding: 8px 12px;
    font-size: 12px;
}
}
</style>