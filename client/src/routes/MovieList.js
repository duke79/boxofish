import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {ResponsivePoster} from "../components/MovieCard";

let S = {};

function MovieList(props) {
    return (
        <div {...props}>
            <Grid container
                  spacing={16}
                  justify={"flex-start"}>
                {props.movies.map(function (movie) {
                    return (
                        <ResponsivePoster
                            title={movie.title}
                            poster={movie.poster}/>
                    );
                })}
            </Grid>
        </div>
    );
}

S.MovieList = styled(MovieList)`
&& {
  //margin: 0px;
  //overflow-x: hidden;
  padding: 8px; //https://material-ui.com/layout/grid/#limitations
  background-color: #d7dee5;
}
`;

S.MovieList.propTypes = {
    classes: PropTypes.object.isRequired
};

S.MovieList.defaultProps = {
    movies: [
        {
            title: "Once Upon a Time in America",
            poster: "https://image.tmdb.org/t/p/original/fqP3Q7DWMFqW7mh11hWXbNwN9rz.jpg"
        },
        {
            title: "A Dog's Will",
            poster: "https://image.tmdb.org/t/p/original/uHEmM49YphluJnGep8Ef1qwD2QX.jpg"
        },
        {
            title: "GoodFellas",
            poster: "https://image.tmdb.org/t/p/original/hAPeXBdGDGmXRPj4OZZ0poH65Iu.jpg"
        },
        {
            title: "One Flew Over the Cuckoo's Nest",
            poster: "https://image.tmdb.org/t/p/original/2Sns5oMb356JNdBHgBETjIpRYy9.jpg"
        },
        {
            title: "Cinema Paradiso",
            poster: "https://image.tmdb.org/t/p/original/hYzCLju3W74nLhhRXfPkwDi1Tun.jpg"
        },
        {
            title: "Green Book",
            poster: "https://image.tmdb.org/t/p/original/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg"
        }, {
            title: "Neon Genesis Evangelion: The End of Evangelion",
            poster: "https://image.tmdb.org/t/p/original/5JYzfyKBwReaQ41WFhqXgOZnPWV.jpg"
        },
        {
            title: "Harakiri",
            poster: "https://image.tmdb.org/t/p/original/5konZnIbcAxZjP616Cz5o9bKEfW.jpg"
        },
        {
            title: "The Great Dictator",
            poster: "https://image.tmdb.org/t/p/original/hK2KsU0lNiYRqIrYJcC3x63dPnH.jpg"
        },
        {
            title: "The Good, the Bad and the Ugly",
            poster: "https://image.tmdb.org/t/p/original/wfPHdfofBD5PN96dV96a51B3Ja2.jpg"
        },
        {
            title: "City Lights",
            poster: "https://image.tmdb.org/t/p/original/bXNvzjULc9jrOVhGfjcc64uKZmZ.jpg"
        },
        {
            title: "Whiplash",
            poster: "https://image.tmdb.org/t/p/original/lIv1QinFqz4dlp5U4lQ6HaiskOZ.jpg"
        },
        {
            title: "Sunset Boulevard",
            poster: "https://image.tmdb.org/t/p/original/oFwzvRgfxJc0FUr2mwYTi10dk3G.jpg"
        },
        {
            title: "Black Mirror: White Christmas",
            poster: "https://image.tmdb.org/t/p/original/he609rnU3tiwBjRklKNa4n2jQSd.jpg"
        },
        {
            title: "Doctor Who: The Day of the Doctor",
            poster: "https://image.tmdb.org/t/p/original/lQy2QVcacuH55k37K9Ox0gw3YpZ.jpg"
        },
        {
            title: "American History X",
            poster: "https://image.tmdb.org/t/p/original/fXepRAYOx1qC3wju7XdDGx60775.jpg"
        },
        {
            title: "Howl's Moving Castle",
            poster: "https://image.tmdb.org/t/p/original/iMarB2ior30OAXjPa7QIdeyUfM1.jpg"
        },
        {
            title: "Princess Mononoke",
            poster: "https://image.tmdb.org/t/p/original/mNqZOtJIQfFQPjo3hmYLIn8Qqhf.jpg"
        },
        {
            title: "City of God",
            poster: "https://image.tmdb.org/t/p/original/gCqnQaq8T4CfioP9uETLx9iMJF4.jpg"
        },
        {
            title: "The Empire Strikes Back",
            poster: "https://image.tmdb.org/t/p/original/9SKDSFbaM6LuGqG1aPWN3wYGEyD.jpg"
        }
    ]
};

export default S.MovieList;
