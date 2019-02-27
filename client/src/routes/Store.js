import { extendObservable, observable, action } from "mobx";
import axios from "axios";

class Store {
    update_movies(){
        let tmdb_api_home = "https://api.themoviedb.org/3";
        let tmdb_api_key = "e30bdefcb66c118c558f0793cf22e8e2";
        axios
            .get(
                `${tmdb_api_home}/movie/top_rated?api_key=${tmdb_api_key}&page=${
                    this.page
                    }`
            )
            .then(res => {
                console.log(res);
                this.top_rated_movies = res.data.results;
            });
    }

    set_page = action("set_page", function(val) {
        this.page = val;
        this.update_movies();
    });

    constructor() {
        extendObservable(this, {
            top_rated_movies: null,
            page: 1
        });
        this.update_movies();
    }
}

const store = new Store();
export default store;
