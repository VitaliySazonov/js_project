// API: https://www.themoviedb.org/settings/api
// login: vito.s
// 80676320
const api = {
  key_v3: '16381b275cdb7f2dddecff30ade20e6a',
  key_v4: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjM4MWIyNzVjZGI3ZjJkZGRlY2ZmMzBhZGUyMGU2YSIsInN1YiI6IjYwNWZhNWQxMzlhMWE2MDA3NTVlMTI1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LozlzwKuUgDyiAZyNK2xYuhIMDlHHNaKvC37wGQzfpg',
  get url_trends_movies() { return`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.key_v3}`},
  get url_trends_tv() { return`https://api.themoviedb.org/3/trending/tv/week?api_key=${this.key_v3}`},
  examp: 'https://api.themoviedb.org/3/movie/550?api_key=16381b275cdb7f2dddecff30ade20e6a',
  start_url: 'https://image.tmdb.org/t/p/w500'
};

export default api
