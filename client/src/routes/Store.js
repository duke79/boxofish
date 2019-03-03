import {extendObservable, observable, action} from "mobx";
import axios from "axios";

class Store {
    constructor() {
        extendObservable(this, {
            movies: [],
        });
        this.page = 1;

        let collection_name = "top_rated";
        this.append_movies(collection_name);
    }

    load_page = action("load_page", function (val, collection_name = "top_rated") {
        this.page = val;
        this.append_movies(collection_name);
    });

    get_movie = action("get_movie", function (id) {
        let movie = null;
        for (let i = 0; i < this.movies.length; i++) {
            // console.log(id);
            if (this.movies[i].id.toString() === id) {
                movie = this.movies[i];
                break;
            }
        }
        console.log(movie);
        return movie ? movie : {title: "not found!"};
    });

    append_movies(collection_name) {
        let tmdb_api_home = "https://api.themoviedb.org/3";
        let tmdb_api_key = "e30bdefcb66c118c558f0793cf22e8e2";
        axios
            .get(
                `${tmdb_api_home}/movie/${collection_name}?api_key=${tmdb_api_key}&page=${
                    this.page
                    }`
            )
            .then(res => {
                // console.log(res);
                Array.prototype.push.apply(this.movies,
                    res.data.results.map((movie) => {
                        if (typeof (movie["list_name"]) === "undefined")
                            movie["list_name"] = [];
                        movie["list_name"].push(collection_name);
                        return movie;
                    }));
            });
    }
}

const store = new Store();
export default store;
