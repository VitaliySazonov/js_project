import './../css/popular_films.css';
import $ from 'jquery';
import api from './api';
import popular_films_template from './../template/popular_films.hbs';

class HomePage {
  constructor() {
    this.popular_films = $('#popular_films');
    this.getAllFavorites(api.url_trends_movies);
    this.getAllFavorites(api.url_trends_tv);
  }

  noMoviesMsg = msg =>
    this.popular_films.html(`<h1>${msg}</h1>` || `<h1>The list is empty</h1>`);

  async getAllFavorites(url) {
    try {
      let res = await fetch(url);
      let data = await res.json();
      data ? this.addMovies(data) : this.noMoviesMsg()
    } catch (err) {
      console.log('Error ==> ', err);
    }
  }

  addMovies(info) {
    let movie = [];
    let movie_page = {};
    info.results.splice(12);
    // console.log('INFOOOO = ', info.results);
    for (let el of info.results) {
      if (el.media_type === 'movie') {
        movie_page.id = 'movies';
        movie_page.btn_text = 'Фильмы';
        movie_page.btn_class = 'btn-inverse';
        movie.push({
          img_url: api.start_url + el.poster_path,
          title: el.title,
          date: el.release_date,
          watch: el.vote_count,
          year: new Date(el.release_date).getFullYear(),
        });
      }
      if (el.media_type === 'tv') {
        movie_page.id = 'tv';
        movie_page.btn_text = 'Передачи и шоу';
        movie_page.btn_class = 'btn-warning';
        movie.push({
          img_url: api.start_url + el.poster_path,
          title: el.name,
          date: el.first_air_date,
          watch: el.vote_count,
          year: new Date(el.first_air_date).getFullYear(),
          country: el.origin_country[0]
        });
      }
      movie_page.movie = movie;
    }
    // console.log('END = ', movie_page);
    this.popular_films.append(popular_films_template(movie_page));
  }
}

let homePage = new HomePage()
