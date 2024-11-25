import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MovieDetails from '../views/MovieDetails.vue';
import FavoritesPage from '../views/FavoritesPage.vue';  // Nombre actualizado

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true,
  },
  {
    path: '/favorites',
    name: 'FavoritesPage',  // Asegúrate de que el nombre coincida con el componente
    component: FavoritesPage,  // Nombre actualizado
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;