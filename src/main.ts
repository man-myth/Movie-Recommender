import './style.css' //importing styles

const apiKey = '279c763f2e6a8bda16449d8d97dd29e6';
const recommendContainer:HTMLDivElement | null = document.querySelector('.recommend-container');
let discoverMovieList: Movie[] = [];  //Create an empty array of type Movie


//  Fetch API to make an HTTP request
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    data.results.forEach((movie: Movie) => {
      discoverMovieList.push(movie)
    })
  })


if (recommendContainer != null) {
  try {     //error handling
    document.querySelector('#surprise-me')!.addEventListener('submit', (event) => {
      event.preventDefault();

      let i:number = Math.floor(Math.random() * 20) + 1;
      let movie:Movie = discoverMovieList[i];
      recommendContainer.innerHTML = '';

      const movieCard:HTMLDivElement = document.createElement('div');
      const cardLeft:HTMLDivElement = document.createElement('div');
      const cardRight:HTMLDivElement = document.createElement('div');
      cardLeft.className = 'left-card';
      cardRight.className = 'right-card';
      movieCard.className = 'movie-card';

      const posterPath:string = movie.poster_path;
      const posterUrl:string = `https://image.tmdb.org/t/p/w500${posterPath}`;
      const movieImg:HTMLImageElement = document.createElement('img');
      movieImg.src = posterUrl;

      cardLeft.appendChild(movieImg);

      const movieTitle:HTMLHeadingElement = document.createElement('h2');
      movieTitle.textContent = movie.title;
      cardRight.appendChild(movieTitle);

      const movieOverview:HTMLParagraphElement = document.createElement('p');
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
const movieItem:NodeListOf<Element> = document.querySelectorAll(".movies li img");

movieItem.forEach(item => {
  item.addEventListener("click", () => {
      console.log(item.innerHTML);
      console.log("clicked");
  })
});
