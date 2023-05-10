import './style.css'
const apiKey = '279c763f2e6a8bda16449d8d97dd29e6';
const searchInput = document.querySelector('.search') as HTMLInputElement; // type assertion
const home:Element = document.querySelector('#home')!;

searchInput.addEventListener('input', () => {
    home.innerHTML = '';
    const movieContainer:HTMLUListElement = document.createElement('ul');
    movieContainer.className = "movies"
    home.appendChild(movieContainer);
    const query:string = searchInput.value;
    if (query == "") {
        window.location.href = "./index.html";
    }

    searchMovies(query, movieContainer);
});

//creating a function that will take a type string and HTMLUListElement as parameter
function searchMovies(query: string, movieContainer: HTMLUListElement) : void {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            // movieContainer.innerHTML = '';
            data.results.forEach((movie: Movie) => {
                //declare html elements
                const movieCard:HTMLDetailsElement = document.createElement('details');
                movieCard.className = 'movie';
                const summary:HTMLElement = document.createElement('summary');
                const li:HTMLLIElement = document.createElement('li');
                const detailsModal:HTMLDivElement = document.createElement('div');
                const posterPath:string = movie.poster_path;
                const posterUrl:string = `https://image.tmdb.org/t/p/w500${posterPath}`;
                if (posterPath == null) {
                    return;
                }
                const movieImg:HTMLImageElement = document.createElement('img');
                const figure:HTMLElement = document.createElement('figure');
                figure.className = "movie__figure";
                movieImg.className = "movie__poster";
                movieImg.src = posterUrl;

                //add contentes to elements
                const movieTitle:HTMLHeadingElement = document.createElement('h2');
                movieTitle.className = "movie__title";
                movieTitle.textContent = movie.title;
                const figcaption:HTMLElement = document.createElement('figcaption');
                const movieRating:HTMLSpanElement = document.createElement('span');
                movieRating.className = "movie__vote";
                movieRating.textContent = Math.round(movie.popularity).toString();

                const movieOverview:HTMLParagraphElement = document.createElement('p');
                movieOverview.textContent = movie.overview;
                
                //append elemets to html
                figcaption.appendChild(movieRating);
                figure.appendChild(movieImg);
                figure.appendChild(figcaption);
                figure.appendChild(movieTitle);
                summary.appendChild(figure);
                movieCard.appendChild(summary);
                movieCard.appendChild(detailsModal);

                li.appendChild(movieCard);
                movieContainer.appendChild(li);

                summary.addEventListener("click", () => {
                    getDetails(movie, detailsModal);
                })
            });
        })
        .catch(error => console.log(error));        //error handling
}

//creating a function that will take a type Movie and HTMLDivElement as parameter
function getDetails(movie: Movie, detailsModal: HTMLDivElement): void {     

    detailsModal.innerHTML = '';
    const detailsLeft = document.createElement('div');
    detailsLeft.className = 'left-card';
    const detailsRight = document.createElement('div');
    detailsRight.className = 'right-card'
    const detailsRightTop = document.createElement('div');
    const detailsRightBottom = document.createElement('div');
    const movieImg2 = document.createElement('img');
    const posterPath = movie.poster_path;
    const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

    movieImg2.src = posterUrl;
    const movieTitle2 = document.createElement('h2');
    movieTitle2.textContent = movie.title;
    const overview = document.createElement('h3');
    overview.textContent = "Overview:"
    const movieOverview2 = document.createElement('p');
    movieOverview2.textContent = movie.overview;
    const movieRating2 = document.createElement('span');
    movieRating2.textContent = "Rating: " + Math.round(movie.popularity).toString();

    detailsLeft.appendChild(movieImg2);
    detailsRightTop.appendChild(movieTitle2);

    detailsRightTop.appendChild(movieRating2);
    detailsRightTop.appendChild(overview);
    detailsRightTop.appendChild(movieOverview2);
    detailsModal.appendChild(detailsLeft);
    detailsRight.appendChild(detailsRightTop);
    detailsRight.appendChild(detailsRightBottom);

    detailsModal.appendChild(detailsRight);

}