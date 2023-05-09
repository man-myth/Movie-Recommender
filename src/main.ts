import './style.css'

const apiKey = '279c763f2e6a8bda16449d8d97dd29e6';

const recommendContainer = document.querySelector('.recommend-container');


//`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=free`
let discoverMovieList: Movie[] = [];
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    data.results.forEach((movie: Movie) => {
      console.log(movie.title)
      discoverMovieList.push(movie)
    })
  })


if (recommendContainer != null) {
  try {
    document.querySelector('#surprise-me')!.addEventListener('submit', (event) => {
      event.preventDefault();
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

const movieItem = document.querySelectorAll(".movies li img");

movieItem.forEach(item => {
  item.addEventListener("click", () => {
      console.log(item.innerHTML);
      console.log("clicked");
  })
});
