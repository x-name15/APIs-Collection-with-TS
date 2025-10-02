const apiMovies = 'http://localhost:7000/api/movies';

async function fetchResource(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Error fetching ${url}: ${res.status}`);
    return res.json();
}

async function renderMovies(url) {
    try {
        const res = await fetchResource(url);
        const container = document.getElementById('movies');
        container.innerHTML = '';

        (res._embedded?.movies || []).forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.style.border = '1px solid #ccc';
            movieDiv.style.margin = '10px';
            movieDiv.style.padding = '10px';

            movieDiv.innerHTML = `
        <h3>${movie.title} (${movie.year})</h3>
        <p>Director: ${movie.director}</p>
        <p>Genres: <span class="genres"></span></p>
        <div class="buttons"></div>
      `;

            const genreSpan = movieDiv.querySelector('.genres');
            const genreNames = movie.genres.map(g => g.name || g).join(', ');
            genreSpan.textContent = genreNames;

            const buttonsDiv = movieDiv.querySelector('.buttons');

            if (movie._links.update) {
                const btnEdit = document.createElement('button');
                btnEdit.textContent = 'Edit';
                btnEdit.addEventListener('click', () => alert(`Edit link: ${movie._links.update.href}`));
                buttonsDiv.appendChild(btnEdit);
            }

            if (movie._links.delete) {
                const btnDelete = document.createElement('button');
                btnDelete.textContent = 'Delete';
                btnDelete.addEventListener('click', async () => {
                    if (confirm(`Delete ${movie.title}?`)) {
                        await fetchResource(movie._links.delete.href, { method: 'DELETE' });
                        alert('Deleted!');
                        renderMovies(apiMovies);
                    }
                });
                buttonsDiv.appendChild(btnDelete);
            }

            const btnDetails = document.createElement('button');
            btnDetails.textContent = 'Details';
            btnDetails.addEventListener('click', async () => {
                const details = await fetchResource(movie._links.self.href);
                const genres = details.genres.map(g => g.name || g).join(', ');
                alert(`Title: ${details.title}\nDirector: ${details.director}\nYear: ${details.year}\nGenres: ${genres}`);
            });
            buttonsDiv.appendChild(btnDetails);

            container.appendChild(movieDiv);
        });
    } catch (err) {
        console.error(err);
        document.getElementById('movies').innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
    }
}

renderMovies(apiMovies);
