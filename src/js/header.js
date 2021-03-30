import $ from "jquery";
import movieMarkup from '../templates/searchMovieRender.hbs'

const debounce = require('lodash.debounce');



class Header {

  constructor(url) {
    this.url = url;
    this.apiKay = '16381b275cdb7f2dddecff30ade20e6a';
  }

  init = () => {
    $('#searchInput').on('input', debounce(this.searchMovie, 500));
    $('.menu-btn').on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('menu-btn_active');
      $('nav').toggleClass('active')
      $('.search').toggleClass('active')
    });
  }

  searchMovie = (event) => {
    if (event.target.value === '' || event.target.value.length < 1) {
      $('#search_content').hide().html('')
      return
    }
    this.searchFetch(event.target.value)
    $('#search_content').show()
  }


  switchBtn = () => {
    $('#home').on('click', function (event) {
      event.preventDefault();
      $('#library').removeClass('active_item');
      $('#home').addClass('active_item')
      $('#search_content').hide()
      // Добавити функу яка працює з home наприклад
      $('#library_content').hide()
      $('#home_content').html('<p>Твій контен home</p>').show()

    })
    $('#library').on('click', function (event) {
      event.preventDefault();
      $('#home').removeClass('active_item');
      $('#library').addClass('active_item');
      $('#search_content').hide()
      // Добавити функу яка працює з library наприклад
      $('#home_content').hide()
      $('#library_content').html('<p>Твій контен library</p>').show()

    })
    $('#brand').on('click', function (event) {
      event.preventDefault()
      $('#home').removeClass('active_item');
      $('#library').removeClass('active_item');
      $('#search_content').hide()
      $('#home_content').hide()
      $('#library_content').hide()
    })
  }

  hideContent = () => {
    $('#home_content').hide()
    $('#library_content').hide()
  }

  renderPage = (data) => {
    this.hideContent();
    let markup = movieMarkup(data.results);
    $('#search_content').html(markup).prepend(`<p class="result">По Вашему запросу найдено ${data.total_results} ответов</p>`)

  }

  searchFetch = async (movieName) => {
    try {
      let response = await fetch(`${this.url}/3/search/movie?api_key=${this.apiKay}&language=ru-US&query=${movieName}&page=1&include_adult=false`);
      let data = await response.json();
      if (data.results.length < 1) {
        $('#search_content').html('<p class="error">Not Found</p>');
        return
      }
      this.renderPage(data)
    } catch (error) {
      $('#search_content').html(`<p>${error}</p>`)
    }
  }
}

let header = new Header('https://api.themoviedb.org');
header.init();
header.switchBtn();
