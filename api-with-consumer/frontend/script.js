const moviesDiv = document.getElementById("movies");
const updateContainer = document.getElementById("update-form-container");

const fetchMovies = () => {
    fetch("/api/movies")
        .then(res => res.json())
        .then(data => {
            moviesDiv.innerHTML = "";
            updateContainer.innerHTML = "";
            if (!data._embedded || !data._embedded.movies) return;

            data._embedded.movies.forEach(movie => {
                const div = document.createElement("div");
                div.classList.add("movie");

                const title = document.createElement("h2");
                title.textContent = `${movie.title} (${movie.year})`;
                div.appendChild(title);

                const director = document.createElement("p");
                director.textContent = `Director: ${movie.director}`;
                div.appendChild(director);

                const genres = document.createElement("p");
                genres.textContent = `Genres: ${movie.genres.map(g => g.name).join(", ")}`;
                div.appendChild(genres);

                const btnContainer = document.createElement("div");
                btnContainer.classList.add("buttons");

                const updateBtn = document.createElement("button");
                updateBtn.textContent = "Update";
                updateBtn.onclick = () => showUpdateForm(movie);
                btnContainer.appendChild(updateBtn);

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = () => {
                    alert(`Simulando DELETE de ${movie.title}`);
                };
                btnContainer.appendChild(deleteBtn);

                div.appendChild(btnContainer);
                moviesDiv.appendChild(div);
            });
        })
        .catch(err => console.error(err));
};

const showUpdateForm = (movie) => {
    updateContainer.innerHTML = "";

    const formDiv = document.createElement("div");
    formDiv.classList.add("update-form");

    const titleInput = document.createElement("input");
    titleInput.value = movie.title;
    const directorInput = document.createElement("input");
    directorInput.value = movie.director;
    const yearInput = document.createElement("input");
    yearInput.value = movie.year;

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Save";
    submitBtn.onclick = () => {
        alert(`Simulando PUT para ${movie.title} con Title=${titleInput.value}, Director=${directorInput.value}, Year=${yearInput.value}`);
        updateContainer.innerHTML = "";
    };

    formDiv.appendChild(document.createTextNode("Title: "));
    formDiv.appendChild(titleInput);
    formDiv.appendChild(document.createElement("br"));
    formDiv.appendChild(document.createTextNode("Director: "));
    formDiv.appendChild(directorInput);
    formDiv.appendChild(document.createElement("br"));
    formDiv.appendChild(document.createTextNode("Year: "));
    formDiv.appendChild(yearInput);
    formDiv.appendChild(document.createElement("br"));
    formDiv.appendChild(submitBtn);

    updateContainer.appendChild(formDiv);
};

fetchMovies();
