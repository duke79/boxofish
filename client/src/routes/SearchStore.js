import {extendObservable, observable, action, computed} from "mobx";
import axios from "axios";
import {tmdb_api_home, tmdb_api_key} from "./Store"

class SearchStore {
    @observable movies = [];

    constructor() {
        this.page = {};
    }

    load_more = action("load_more", function (query) {
        if (typeof(store.page[query]) === "undefined")
            store.page[query] = 0;
        store.load_page(store.page[query] + 1, query);
    });

    load_page = action("load_page", function (val, query = "alita") {
        if(query.length > 0) {
            console.log("Loading... " + query);
            this.page[query] = val;
            this.append_movies(query);
        }
    });

    append_movies(query) {
        axios
            .get(
                `${tmdb_api_home}/search/movie?query=${query}&api_key=${tmdb_api_key}&page=${
                    this.page[query]
                    }`
            )
            .then(res => {
                // console.log(res);
                Array.prototype.push.apply(this.movies,
                    res.data.results.map((movie) => {
                        if (typeof (movie["query"]) === "undefined")
                            movie["query"] = [];
                        movie["query"].push(query);
                        return movie;
                    }));
                console.log(this.movies);
            });
    }
}

const store = new SearchStore();
export default store;
