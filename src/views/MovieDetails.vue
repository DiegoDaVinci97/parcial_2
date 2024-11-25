<template>
    <div class="movie-details">
      <h1>{{ movie.title }}</h1>
      <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Movie Poster" class="movie-poster"/>
      
      <div class="movie-info">
        <p><strong>Año de lanzamiento:</strong> {{ movie.release_date }}</p>
        <p><strong>Descripción:</strong> {{ movie.overview }}</p>
        <p><strong>Géneros:</strong> 
          <span v-for="(genre, index) in movie.genres" :key="index" class="movie-genre">{{ genre.name }}{{ index < movie.genres.length - 1 ? ', ' : '' }}</span>
        </p>
        <p><strong>Clasificación por edades:</strong> {{ movie.adult ? 'Adulto' : 'Todos' }}</p>
      </div>
  
      <!-- Botón de favoritos -->
      <button @click="addToFavorites" :disabled="isFavorite" class="favorite-button">
        {{ isFavorite ? '¡Ya está en tus favoritos!' : 'Agregar a favoritos' }}
      </button>
  
      <p v-if="isFavorite" class="favorite-message">Esta película ya está en tu lista de favoritos.</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import movieApi from '../services/movieApi'; // Asegúrate de importar el servicio
  
  export default {
    name: 'MovieDetails',
    props: ['id'], // Recibe el ID de la película desde la URL
    setup(props) {
      const movie = ref({});
      const isFavorite = ref(false);
  
      onMounted(async () => {
        const details = await movieApi.getMovieDetails(props.id); // Llama al servicio para obtener los detalles
        movie.value = details;
        checkFavoriteStatus(); // Verifica si la película ya está en favoritos
      });
  
      // Verifica si la película está en favoritos
      const checkFavoriteStatus = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        isFavorite.value = favorites.some(fav => fav.id === movie.value.id);
      };
  
      // Agrega la película a favoritos
      const addToFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(movie.value);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        isFavorite.value = true; // Marca como favorita
      };
  
      return { movie, isFavorite, addToFavorites };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos mejorados para la página de detalles */
  .movie-details {
    font-family: 'Arial', sans-serif;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: #333;
  }
  
  .movie-poster {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .movie-info {
    font-size: 1.1rem;
    color: #555;
  }
  
  .movie-genre {
    color: #007bff;
    font-weight: bold;
  }
  
  .favorite-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
    margin-top: 20px;
  }
  
  .favorite-button:hover {
    background-color: #218838;
  }
  
  .favorite-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .favorite-message {
    font-size: 1rem;
    color: #28a745;
    margin-top: 10px;
    font-weight: bold;
  }
  </style>