import './style.css'



const apiKey = '279c763f2e6a8bda16449d8d97dd29e6';

const searchInput = document.querySelector('.search') as HTMLInputElement;
const searchButton = document.querySelector('.search-btn');
const movieContainer = document.querySelector('.movie-container');
const recommendContainer = document.querySelector('.recommend-container');

interface Movie {
  title: string;
  overview: string;
  poster_path: string,
  adult: false
  backdrop_path: string,
  genre_ids: [],
  id: Number,
  original_language: string,
  original_title: string,
  popularity: number,
  release_date: string,
  video: boolean,
  vote_average: number,
  vote_count: number,

}

//`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=free`
let discoverMovieList: Movie[] = [];
fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1`)
  .then(response => response.json())
  .then(data => {
    data.results.forEach((movie: Movie) => {
      console.log(movie.title)
      discoverMovieList.push(movie)
    })
  })


if (recommendContainer != null) {
  try {
    document.querySelector('#surprise-me')!.addEventListener('submit', e => {
      let i = Math.floor(Math.random() * 20) + 1;
      let movie = discoverMovieList[i];
      recommendContainer.innerHTML = '';

      const movieCard = document.createElement('div');
      const cardLeft = document.createElement('div');
      const cardRight = document.createElement('div');
      cardLeft.className = 'left-card';
      cardRight.className = 'right-card';
      movieCard.className = 'movie-card';
      const posterPath = movie.poster_path;
      const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
      const movieImg = document.createElement('img');
      movieImg.src = posterUrl;
      
      cardLeft.appendChild(movieImg);

      const movieTitle = document.createElement('h2');
      movieTitle.textContent = movie.title;
      cardRight.appendChild(movieTitle);

      const movieOverview = document.createElement('p');
      movieOverview.textContent = movie.overview;
      cardRight.appendChild(movieOverview);

      movieCard.appendChild(cardLeft);
      movieCard.appendChild(cardRight);
      recommendContainer.appendChild(movieCard);
    })
  } catch (error) {
    console.log(error);
  }

}


if (searchButton != null && movieContainer != null) {

  searchButton.addEventListener('click', () => {
    const query = searchInput.value;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
      .then(response => response.json())
      .then(data => {
        movieContainer.innerHTML = '';
        data.results.forEach((movie: Movie) => {
          const movieCard = document.createElement('div');
          movieCard.className = 'movie-card';

          const posterPath = movie.poster_path;
          const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
          console.log(posterUrl);

          const movieImg = document.createElement('img');
          movieImg.src = posterUrl;
          movieCard.appendChild(movieImg);

          const movieTitle = document.createElement('h2');
          movieTitle.textContent = movie.title;
          movieCard.appendChild(movieTitle);

          const movieOverview = document.createElement('p');
          movieOverview.textContent = movie.overview;
          movieCard.appendChild(movieOverview);

          movieContainer.appendChild(movieCard);
        });
      })
      .catch(error => console.log(error));
  });
}

