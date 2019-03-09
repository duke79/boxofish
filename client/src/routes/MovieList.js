import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import {ResponsivePoster} from "../components/MovieCard";

import {observer} from "mobx-react";
import store from "./Store"
import CircularProgress from '@material-ui/core/CircularProgress';
import {Route} from "react-router-dom";
import Menu from "../components/Menu";

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

        if (this.to_load_more) this.load_more(this.props);
    }

    componentWillReceiveProps(props) {
        if (this.to_load_more) this.load_more(props);
    }

    get to_load_more() {
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

    load_more(props) {
        store.load_more(props.match.params.collection_name);
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
            store.load_more(this.props.match.params.collection_name);
            this.remove_scroll_listener();
        }
    };

    render() {
        this.add_scroll_listener();

        // console.log(store);
        const tmdb_images_prefix = "https://image.tmdb.org/t/p/original/";
        const tmdb_small_images_prefix = "https://image.tmdb.org/t/p/w200/";

        return (
            <Menu>
                <div {...this.props} ref={this.myRef}>
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
                    <S.CircularProgress/>
                </div>
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

