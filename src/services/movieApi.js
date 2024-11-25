import axios from 'axios';

const API_KEY = '16f1fb9a0c39a56b9bcc885d9dc796f2';
const API_URL = 'https://api.themoviedb.org/3'; 

export default {
  async getGenres() {
    try {
      const response = await axios.get(`${API_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES',
        },
      });
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  },

  // Función para obtener películas por género
  async getMoviesByGenre(genreId) {
    try {
      const response = await axios.get(`${API_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          language: 'es-ES',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      return[];
}
},

  async getPopularMovies() {
    try {
      const response = await axios.get(`${API_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  async searchMovies(query) {
    try {
      const response = await axios.get(`${API_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
          language: 'es-ES',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  async getMovieDetails(id) {
    try {
      const response = await axios.get(`${API_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          language: 'es-ES',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
}
},
};