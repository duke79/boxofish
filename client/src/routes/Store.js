import {extendObservable, observable, action} from "mobx";
import axios from "axios";

export const tmdb_api_home = "https://api.themoviedb.org/3";
export const tmdb_api_key = "e30bdefcb66c118c558f0793cf22e8e2";
export const tmdb_images_prefix = "https://image.tmdb.org/t/p/original/";
export const tmdb_small_images_prefix = "https://image.tmdb.org/t/p/w200/";

class Store {
    @observable movies = [];
    @observable movie = {
        title: null,
        videos: []
    };
    @observable genres = [];

    constructor() {
        this.page = {};

        // let collection_name = "top_rated";
        // this.append_movies(collection_name);
        this.update_genres();
    }

    load_more = action("load_more", function (collection_name) {
        if(typeof(store.page[collection_name]) === "undefined")
            store.page[collection_name] = 0;
        store.load_page(store.page[collection_name] + 1, collection_name);
    });

    load_page = action("load_page", function (val, collection_name = "top_rated") {
        console.log("Loading... " + collection_name);
        this.page[collection_name] = val;
        this.append_movies(collection_name);
    });

    get_movie = action("get_movie", function (id) {
        let movie = null;
        for (let i = 0; i < this.movies.length; i++) {
            // console.log(id);
            if (this.movies[i].id.toString() === id) {
                this.movie = this.movies[i];
                break;
            }
        }
        console.log(this.movie);
        this.update_movie_videos();
        this.populate_movie_genres();
        return this.movie;
    });

    update_movie_videos(id) {
        axios
            .get(
                `${tmdb_api_home}/movie/${this.movie.id}/videos?api_key=${tmdb_api_key}`
            )
            .then(res => {
                // console.log(res);
                this.movie.videos = res.data.results;
            });
    }

    populate_movie_genres() {
        if (!this.movie.genre_ids) return;
        if (!this.genres) return;

        console.log(this.movie.genre_ids);
        console.log(this.genres);

        this.movie.genres = [];
        for (let i = 0; i < this.movie.genre_ids.length; i++) {
            for (let j = 0; j < this.genres.length; j++) {
                if (this.movie.genre_ids[i].toString() === this.genres[j].id.toString())
                    this.movie.genres.push(this.genres[j]);
                else {
                    console.log(this.movie.genre_ids[i] +
                        " & " +
                        this.genres[j].id +
                        " are not equal! "
                    )
                }
            }
        }
    }

    append_movies(collection_name) {
        axios
            .get(
                `${tmdb_api_home}/movie/${collection_name}?api_key=${tmdb_api_key}&page=${
                    this.page[collection_name]
                    }`
            )
            .then(res => {
                // console.log(res);
                Array.prototype.push.apply(this.movies,
                    res.data.results.map((movie) => {
                        if (typeof (movie["collection_name"]) === "undefined")
                            movie["collection_name"] = [];
                        movie["collection_name"].push(collection_name);
                        return movie;
                    }));
                console.log(this.movies);
            });
    }

    update_genres() {
        axios
            .get(
                `${tmdb_api_home}/genre/movie/list?api_key=${tmdb_api_key}`
            )
            .then(res => {
                console.log(res.data);
                Array.prototype.push.apply(this.genres,
                    res.data.genres ? res.data.genres.map((genre) => {
                        return genre;
                    }) : null);
                console.log(this.genres);
            });
    }
}

const store = new Store();
export default store;
