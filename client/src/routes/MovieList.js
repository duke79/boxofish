import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {ResponsivePoster} from "../components/MovieCard";
import {observer} from "mobx-react";
import store from "./Store"

let S = {};

function MovieList(props) {
    // console.log(store);
    const tmdb_images_prefix = "https://image.tmdb.org/t/p/original/";

    return (
        <div {...props}>
            <Grid container
                  spacing={16}
                  justify={"flex-start"}>
                {store.top_rated_movies ? store.top_rated_movies.map(function (movie) {
                    return (
                        <ResponsivePoster
                            title={movie.title}
                            poster={tmdb_images_prefix + movie.poster_path}/>
                    );
                }) : null}
            </Grid>
        </div>
    );
}

S.MovieList = styled(observer(MovieList))`
&& {
  //margin: 0px;
  //overflow-x: hidden;
  padding: 8px; //https://material-ui.com/layout/grid/#limitations
  background-color: #d7dee5;
}
`;

S.MovieList.defaultProps = {
};

export default S.MovieList;

