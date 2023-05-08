import './style.css'
const apiKey = '279c763f2e6a8bda16449d8d97dd29e6';

const searchInput = document.querySelector('.search') as HTMLInputElement;


searchInput.addEventListener('input', () => {

    const home = document.querySelector('#home')!;
    home.innerHTML = '';
    const movieContainer = document.createElement('ul');
    movieContainer.className = "movies"
    home.appendChild(movieContainer);

    const query = searchInput.value;

    if (query == "") {
        window.location.href = "./index.html";
    }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            // movieContainer.innerHTML = '';
            data.results.forEach((movie: Movie) => {
                const movieCard = document.createElement('div');
                const cardLeft = document.createElement('div');
                const cardRight = document.createElement('div');
                const li = document.createElement('li');
                cardLeft.className = 'left-card';
                cardRight.className = 'right-card';
                movieCard.className = 'movie';

                const posterPath = movie.poster_path;
                const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

                const movieImg = document.createElement('img');
                const figure = document.createElement('figure');
                figure.className = "movie__figure";
                movieImg.className = "movie__poster"; 
                movieImg.src = posterUrl;

             

                const movieTitle = document.createElement('h2');
                movieTitle.className = "movie__title"; 
                movieTitle.textContent = movie.title;
                const figcaption = document.createElement('figcaption');
                const movieRating = document.createElement('span');
                movieRating.className = "movie__vote"; 
                movieRating.textContent = movie.popularity.toString();
        

                figcaption.appendChild(movieRating);
                figure.appendChild(movieImg);
                figure.appendChild(figcaption);
                figure.appendChild(movieTitle);
                // cardRight.appendChild(movieTitle);

                // const movieOverview = document.createElement('p');
                // movieOverview.textContent = movie.overview;
                // cardRight.appendChild(movieOverview);

                // movieCard.appendChild(cardLeft);
                // movieCard.appendChild(cardRight);
                movieCard.appendChild(figure);
                li.appendChild(movieCard)
                movieContainer.appendChild(li);
            });
        })
        .catch(error => console.log(error));
});


