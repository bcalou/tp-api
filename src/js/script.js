// Node_modules import

require("popper.js");
require("bootstrap");

const $ = require("jquery");
global.$ = global.jQuery = $;

axios = require("axios");

const toastr = require("toastr");

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-left",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

// api_key declaration :

api_key = "671ff2d2f9bdd88c6aca69d343ed170e";

// Script

$(document).ready(function () {
  $(".movie-detals").hide();

  // Lorsque l'utilisateur entre le nom d'un film et clique sur Chercher, on ajoute les informations du film
  $(".search").click(function () {
    var title = $(".themvdb-input").val();
    setMovie(title);
  });
});

/**
 * Affecte toutes les informations du film sur la page
 *
 * 1. Informations principales (titre, date de sortie, résumé)
 * 2. Images (jaquette et image de fond)
 * 3. Votes du public (popularité du film)
 * 4. Bande-annonce du film (ne sera finalement pas utilisée)
 * 5. Les 6 premiers acteurs parmi la liste retournée par l'API
 * @param {string} title
 */
function setMovie(title) {
  // Récupération du film grâce à l'API de themoviedb
  getMovieObject(title).then((movie) => {
    if (movie != null) {
      $(".movie-detals").hide();

      setMovieMainInfo(movie); // Titre, date de sortie, résumé
      setMovieImages(movie); // Jaquette, image de fond
      setMovieVotes(movie); // Popularité du film
      // setMovieTrailerVideo(movie); Fonctionne mais ne sera pas utilisée
      setMovieSixFirstActors(movie); // Ajoute les 6 premiers acteurs parmis la liste retournée par themoviedb

      $(".movie-detals").show();
    } else {
      toastr["error"](
        "Nous n'avons pas trouvé votre film, veuillez essayer autre chose !",
        "Erreur"
      );
    }
  });
}

/**
 * Récupère l'objet du film en fonction du titre
 * @param {string} title
 */
function getMovieObject(title) {
  title = title.replace(/ /, "+");
  return axios
    .get("https://api.themoviedb.org/3/search/movie", {
      params: {
        api_key: api_key,
        query: title,
        page: 1,
        language: "fr-FR",
      },
    })
    .then((response) => {
      var movie = response.data.results[0];
      return movie;
    });
}

/**
 * Affecte les informations principales du film (titre original, date de sortie, résumé du film)
 * @param {object} movie
 */
function setMovieMainInfo(movie) {
  $(".movie-name").html(movie.original_title); // Titre original

  var movieDate = new Date(movie.release_date);
  const year = new Intl.DateTimeFormat("fr", { year: "numeric" }).format(
    movieDate
  );
  const month = new Intl.DateTimeFormat("fr", { month: "numeric" }).format(
    movieDate
  );
  const day = new Intl.DateTimeFormat("fr", { day: "numeric" }).format(
    movieDate
  );
  var frenchMovieDate = `${day}/${month}/${year}`;
  $(".movie-release-date").html(" (" + frenchMovieDate + ")"); // Date de sortie
  $(".movie-overview").html(movie.overview); // Résumé du film
}

/**
 * Insère l'image de jaquette et de fond du movie sur elles sont disponibles sur themoviedb
 * @param {object} movie
 */
function setMovieImages(movie) {
  if (movie.poster_path) {
    var moviePoster = "http://image.tmdb.org/t/p/w185/" + movie.poster_path;
    $(".movie-poster").attr("src", moviePoster);
  }

  if (movie.backdrop_path) {
    var movieBackground =
      "https://image.tmdb.org/t/p/w500/" + movie.backdrop_path;
    $("body").css("background", "url(" + movieBackground + ") no-repeat");
  }
}

/**
 * Attribue le pourcentage de votes sur le film
 * @param {object} movie
 */
function setMovieVotes(movie) {
  var number = movie.vote_average;

  $("movie-vote").hide();
  var path = $(".circle-rate.circle").get(0);
  var dasharray = number * 10 + ", 100";
  path.setAttribute("stroke-dasharray", dasharray);

  $(".percentage").html(number * 10 + "%");
  $("movie-vote").show();
}

/**
 * Récupère la bande-annonce du film si présente dans la base de données de themoviedb
 * Fonctionne mais je n'utiliserai pas cette fonction
 * @param {object} movie
 */
function setMovieTrailerVideo(movie) {
  getMovieTrailer(movie.id).then((trailer) => {
    if (trailer) {
      var video = "https://www.youtube.com/embed/" + trailer.key;
      $(".movie-video-frame").attr("src", video);
    }
  });
}

/**
 * Récupère la bande-annonce du film
 * @param {number} id
 */
function getMovieTrailer(id) {
  return axios
    .get("http://api.themoviedb.org/3/movie/" + id + "/videos", {
      params: {
        api_key: api_key,
        language: "fr-FR",
      },
    })
    .then((response) => {
      var trailer = response.data.results[0];
      return trailer;
    });
}

/**
 * Ajoute les 6 premiers acteurs de la liste des acteurs retournée par themoviedb
 *
 * @param {object} movie
 *
 * 1. Récupérer les personnages du film
 * 2. Ne prendre que les 6 premiers de la liste
 * 3. Retirer tous les précédents acteurs de la page si elle en comporte
 * 4. Récupérer l'acteur correspondant à chaque personnage
 * 5. Récupérer la div "par défaut" et la cloner 6 fois en y ajoutant les informations de l'acteur,
 *      puis l'inclure dans le DOM
 */
function setMovieSixFirstActors(movie) {
  var movieId = movie.id;

  return axios
    .get("https://api.themoviedb.org/3/movie/" + movieId + "/credits", {
      params: {
        api_key: api_key,
        language: "fr-FR",
      },
    })
    .then((response) => {
      characters = response.data.cast.slice(1, 7);

      $(".actors-list")
        .find(".actor-item")
        .not(".default")
        .each(function (index, actor) {
          actor.remove();
        });
      var defaultDiv = $(".actors-list").find(".actor-item.default");

      $.each(characters, function (index, character) {
        getActor(character.id).then((actor) => {
          actor = actor.data;
          console.log(actor);
          var actorDiv = defaultDiv.clone();

          actorDiv.find(".actor-name").each(function () {
            $(this).html(actor.name);
          });

          if (actor.profile_path) {
            var actortImage =
              "https://image.tmdb.org/t/p/w500/" + actor.profile_path;
          } else {
            var actortImage =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
          }

          actorDiv.find(".actor-image").attr("src", actortImage);

          actorDiv
            .find(".character-name")
            .html(
              "Dans le rôle de <strong>" + character.character + "</strong>"
            );
          if (actor.biography) {
            var biography = actor.biography.substring(0, 500) + " ...";
          } else {
            var biography =
              "Cet acteur ne possède pas encore de biographie. Revenez plus tard pour la consulter";
          }
          actorDiv.find(".actor-biography").html(biography);
          actorDiv.removeClass("default");

          $(".actors-list").append(actorDiv);
        });
      });
    });
}

/**
 * Récupère l'objet de l'acteur dans themoviedb en fonction de l'ID
 * @param {number} id id de l'acteur
 */
function getActor(id) {
  return axios
    .get("https://api.themoviedb.org/3/person/" + id, {
      params: {
        api_key: api_key,
        language: "fr-FR",
      },
    })
    .then((actor) => {
      return actor;
    });
}
