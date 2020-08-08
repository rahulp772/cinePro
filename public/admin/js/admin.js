const fetch_btn = document.getElementById("get_info_imdb");
const new_movie_form = document.getElementById("add");

new_movie_form.addEventListener("submit",async (fn) => {
  fn.preventDefault();
  try{
    const movieName = document.getElementById("movie_Name").value;
    const genres = [
      ...document.querySelectorAll("input[name=genre]:checked"),
    ].map((e) => e.value);
    const category = document.getElementById("movie_category").value;
    const releaseYear = document.getElementById("release_year").value;
    const imdb_rating = document.getElementById("imdb_rating").value;
    const ratings_qty = document.getElementById("rating_qty").value;
    const movie_duration = document.getElementById("movie_duration").value;
    const poster = document.getElementById("poster_img_link").value;
    const movie_storyline = document.getElementById("movie_plot").value;
    const quality = document.getElementById("quality").value;
    const resolutions = [
      ...document.querySelectorAll("input[name=resolution]:checked"),
    ].map((e) => e.value);
    const size = [...document.getElementsByClassName("res_size")].map(
      (e) => e.value
    );
    const format = document.getElementById("video_format").value;
    const fps = document.getElementById("video_fps").value;
    const codec = document.getElementById("video_codec").value;
    const audio = [
      ...document.querySelectorAll("input[name=audio]:checked"),
    ].map((e) => e.value);
    const subTitles = [
      ...document.querySelectorAll("input[name=subs]:checked"),
    ].map((e) => e.value);
    // const poster_link = document.getElementById("poster_img_link").value;
    const onlineLink = [...document.getElementsByClassName("online_link")].map(
      (e) => e.value
    );
    const downloadLink = [
      ...document.getElementsByClassName("download_link"),
    ].map((e) => e.value);

    const obj = {
      movieName,
      genre: genres,
      category,
      releaseYear,
      rating: imdb_rating,
      ratingQuantity: ratings_qty,
      duration: movie_duration,
      plot: movie_storyline,
      poster,
      quality,
      size,
      resolution: resolutions,
      format,
      fps,
      codec,
      audioFormat: audio,
      subtitles: subTitles,
      onlineWatchLink: onlineLink,
      downloadLink: downloadLink,
    };

    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:5000/cinepro/api/v1/movies",
      data: obj,
    });
    if(res.data.status === 'success'){
      alert("New movie added successfully!");
    }
  } catch(err){
    alert("Error" + err);
    console.log(err);
  }
  });

function enableTextBox(x) {
  const res_check = x.getAttribute("data-res");
  const res_size = document.querySelectorAll(".res_size");
  const online_link = document.querySelectorAll(".online_link");
  const down_link = document.querySelectorAll(".download_link");

  if (x.checked) {
    res_size[res_check].removeAttribute("disabled");
    online_link[res_check].removeAttribute("disabled");
    down_link[res_check].removeAttribute("disabled");
  } else {
    res_size[res_check].setAttribute("disabled", true);
    online_link[res_check].setAttribute("disabled", true);
    down_link[res_check].setAttribute("disabled", true);
  }
}

function addMovie(info) {
  console.log(info);
  document.getElementById("movie_Name").value = info.Title;
  document.getElementById("movie_poster_tmp").setAttribute("src", info.Poster);
  document.getElementById("release_year").value = info.Year;
  document.getElementById("imdb_rating").value = info.imdbRating;
  document.getElementById("rating_qty").value = info.imdbVotes
    .split(",")
    .join("");
  document.getElementById("movie_duration").value = info.Runtime.split(" ")[0];
  document.getElementById("poster_img_link").value = info.Poster;
  document.getElementById("movie_plot").value = info.Plot;
  const genreDom = document.getElementsByName("genre");

  for (i in genreDom) {
    genreDom[i].checked = false;
  }

  const genre = info.Genre.split(", ");

  for (i in genreDom) {
    const val = genreDom[i].value;
    if (genre.includes(val)) {
      genreDom[i].checked = true;
    }
  }
}

// http://www.omdbapi.com/?i=tt3896198&apikey=dac698f1
fetch_btn.addEventListener("click", async () => {
  const title = document.getElementById("imdb_link").value.split("/")[4];
  await fetch(`http://www.omdbapi.com/?i=${title}&apikey=dac698f1`)
    .then((res) => res.json())
    .then((data) => addMovie(data));
});
