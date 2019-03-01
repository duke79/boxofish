import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {ResponsivePoster} from "../components/MovieCard";

import {observer} from "mobx-react";
import store from "./Store"
import CircularProgress from '@material-ui/core/CircularProgress';
import {Route} from "react-router-dom";

let S = {};

S.CircularProgress = styled(CircularProgress)`
  &&{
    margin: 20px auto auto;
    display: block;
  }
`;

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    isBottom(el) {
        // return el.getBoundingClientRect().bottom <= window.innerHeight;
        let this_bottom = this.myRef.current.getBoundingClientRect().bottom;
        // console.log(this_bottom);
        // console.log(window.innerHeight);
        return this_bottom <= window.innerHeight;
    }

    add_scroll_listener() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    remove_scroll_listener() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    componentDidMount() {
        this.add_scroll_listener();
    }

    componentWillUnmount() {
        this.remove_scroll_listener();
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('header');
        if (this.isBottom(wrappedElement)) {
            // console.log('header bottom reached');
            this.load_more();
            this.remove_scroll_listener();
        }
    };

    load_more() {
        store.set_page(store.page + 1);
    }

    render() {
        this.add_scroll_listener();

        // console.log(store);
        const tmdb_images_prefix = "https://image.tmdb.org/t/p/original/";

        return (
            <div {...this.props} ref={this.myRef}>
                <Grid container
                      spacing={16}
                      justify={"flex-start"}>

                    {store.top_rated_movies ? store.top_rated_movies.map(function (movie) {
                        return (
                            <Route render={({history}) => (
                                <ResponsivePoster
                                    onClick={(e) => {
                                        history.push("/movie/" + movie.id)
                                    }}
                                    title={movie.title}
                                    poster={tmdb_images_prefix + movie.poster_path}/>
                            )}/>
                        );
                    }) : null}
                </Grid>
                <S.CircularProgress/>
            </div>
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

