import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {ResponsivePoster} from "../components/MovieCard";

import {observer} from "mobx-react";
import store from "./Store"
import {Route} from "react-router-dom";
import Menu from "../components/Menu";
import InfiniteScroll from "../components/InfiniteScroll";

let S = {};

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.load_more = this.load_more.bind(this);
        this.to_load_more = this.to_load_more.bind(this);
    }

    load_more(props) {
        store.load_more(this.props.match.params.collection_name);
    }

    to_load_more() {
        let to_load_more = true;
        if (store.movies) {
            store.movies.forEach(movie => {
                if (movie.collection_name.includes(this.props.match.params.collection_name)) {
                    to_load_more = false;
                }
            })
        }
        return to_load_more;
    }

    render() {
        // console.log(store);
        const tmdb_images_prefix = "https://image.tmdb.org/t/p/original/";
        const tmdb_small_images_prefix = "https://image.tmdb.org/t/p/w200/";

        return (
            <Menu>
                <InfiniteScroll
                    load_more={this.load_more}
                    to_load_more={this.to_load_more}>
                    <div {...this.props}>
                        <Grid container
                              spacing={16}
                              justify={"flex-start"}>

                            {store.movies ? store.movies.map(function (movie) {
                                if (!movie.collection_name.includes(this.props.match.params.collection_name)) return;
                                return (
                                    <Route render={({history}) => (
                                        <ResponsivePoster
                                            onClick={(e) => {
                                                history.push("/movie/" + movie.id)
                                            }}
                                            title={movie.title}
                                            poster={tmdb_small_images_prefix + movie.poster_path}/>
                                    )}/>
                                );
                            }.bind(this)) : null}
                        </Grid>
                    </div>
                </InfiniteScroll>
            </Menu>
        );
    }
}

S.MovieList = styled(observer(MovieList))`
    && {
        //margin: 0px;
        //overflow-x: hidden;
        padding: 8px; //https://material-ui.com/layout/grid/#limitations
        background-color: #d7dee5;
    }
    `;

S.MovieList.defaultProps = {};

export default S.MovieList;

