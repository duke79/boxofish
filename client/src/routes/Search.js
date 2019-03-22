import React from 'react';
import styled, {css} from 'styled-components';
import {Route} from "react-router-dom";
import SearchIcon from "../../node_modules/@material-ui/icons/Search";
import BackIcon from '@material-ui/icons/ArrowBack';
import Grid from "@material-ui/core/Grid";
import {tmdb_small_images_prefix} from "./Store";
import store from "./SearchStore"
import {ResponsivePoster} from "../components/MovieCard";
import InfiniteScroll from "../components/InfiniteScroll";
import {Observer, observer} from "mobx-react";
import {computed} from "mobx";

let S = {};
S.Container = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
`;

S.Result = styled.div`

`;

S.Bar = styled.div`
  display: grid;
  grid-template-columns: 50px auto;
  box-shadow: 0 0 6px 1px #00000063;
  padding-bottom: 10px;
  //background: aliceblue;
`;

S.Back = styled.div`
    margin: 5px;
    padding: 5px 5px 5px 8px;  
`;

S.BackIcon = styled(BackIcon)`
  margin-left: auto;
  margin-right: 12px;
  cursor: pointer;
`;

S.Input = styled.input`
    margin: 5px;
    padding: 5px 5px 5px 8px;
    outline: none;
    border: black solid 0;
`;

@observer
class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        };

        this.load_more = this.load_more.bind(this);
        this.to_load_more = this.to_load_more.bind(this);
    }

    load_more(props) {
        store.load_more(this.state.query);
    }

    to_load_more() {
        let to_load_more = true;
        if (store.movies) {
            store.movies.forEach(movie => {
                if (movie.query.includes(this.state.query)) {
                    to_load_more = false;
                }
            })
        }
        return to_load_more;
    }

    @computed get movies() {
        return store.movies ? store.movies.map(function (movie) {
            console.log(movie);
            if (movie.query.includes(this.state.query)) {
                return movie;
            }
        }.bind(this)) : [];
    }

    render() {
        console.log("dendering!");
        return (
            <Route render={({history}) => (
                <Observer>
                    {() =>
                        <S.Container>
                            <S.Bar>
                                <S.Back onClick={e => history.goBack()}>
                                    <S.BackIcon/>
                                </S.Back>
                                <S.Input onChange={e => {
                                    this.state.query = e.currentTarget.value;
                                    console.log("Searching..." + this.state.query);
                                    this.load_more(this.state.query);
                                }}/>
                            </S.Bar>
                            <S.Result>
                                <InfiniteScroll
                                    load_more={this.load_more}
                                    to_load_more={this.to_load_more}>
                                    <div {...this.props}>
                                        <Grid container
                                              spacing={16}
                                              justify={"flex-start"}>

                                            {this.movies.map(function (movie) {
                                                if (typeof (movie) === "undefined") return;
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
                                            }.bind(this))}
                                        </Grid>
                                    </div>
                                </InfiniteScroll>
                            </S.Result>
                        </S.Container>}
                </Observer>)}
            />
        )
    }
}

// export default observer(Search);
export default Search;