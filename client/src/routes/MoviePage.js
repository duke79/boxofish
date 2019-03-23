import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import YTPlayer from "../components/YTPlayer";
import Divider from "@material-ui/core/Divider";
import store from "./Store"
import {observer} from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";

let S = {};

function TitleBlock(props) {
    return (
        <div {...props}>
            <img
                {...props}
                src="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
            />
        </div>
    );
}

const TitleBlockS = styled(TitleBlock)`
  width: 100%;
`;

S.Card = styled(Card)``;

@observer
class MovieTitle extends React.Component {
    render() {
        return (
            <S.Card {...this.props}>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {this.props.title}
                    </Typography>
                </CardContent>
            </S.Card>
        );
    }
}

S.MovieTitle = styled(MovieTitle)`
  && > div {
    padding-bottom: 0;
  }
`;

S.YTPlayer = styled(YTPlayer)`
  && {
    padding: 0;
    width: 100%;
    max-width: 400px;
    height: 220px;
    margin: auto;
  }
`;

S.Divider = styled(Divider)`
  && {
    padding-top: 15px;
    background-color: #f9f9f9;
  }
`;

function Overview(props) {
    return (
        <S.Card {...props}>
            <CardContent>
                <Typography gutterBottom variant="p">
                    {props.overview ?
                        props.overview :
                        "Not found!"}
                </Typography>
            </CardContent>
        </S.Card>
    );
}

function Ratings(props) {
    return (
        <div>
            <Typography gutterBottom variant="h5" {...props}>
                {props.vote_average ? props.vote_average : 0}
            </Typography>
        </div>
    );
}

S.Ratings = styled(Ratings)`
  && {
    align-self: center;
    font-family: Srisakdi;
    // border-bottom: #0000002b solid 1px;
    color: blue;
  }
`;

function Genres(props) {
    console.log(props);
    let genres = props.genres ? props.genres.map(function (genre, idx) {
        let post_fix = idx < props.genres.length - 1 ? ", " : "";
        // console.log("To append: " + post_fix);
        return genre.name + post_fix;
    }) : null;
    console.log(genres);

    return (
        <Typography gutterBottom variant="p" {...props}>
            {genres}
        </Typography>
    );
}

S.Genres = styled(Genres)`
  padding-left: 30px;
  align-self: center;
  //padding-bottom: 10px;
  font-family: Monospace;
`;

@observer
class Stats extends React.Component {
    render() {
        return (
            <S.Card {...this.props}>
                <CardContent>
                    <S.Ratings vote_average={this.props.vote_average}/>
                    <S.Genres genres={this.props.genres}/>
                </CardContent>
            </S.Card>
        );
    }
}

S.Stats = styled(Stats)`
  && > div {
    padding-bottom: 0;
    display: flex;
    padding-left: 30px;
    // align-items: center;
    // justify-content: center;
  }
`;

@observer
class PageLayout extends React.Component {
    render() {
        return (
            <div {...this.props}>
                <Grid container spacing={16} justify={"flex-start"} direction="column">
                    <S.YTPlayer
                        videoId={(this.props.movie.videos &&
                            this.props.movie.videos[0] &&
                            this.props.movie.videos[0].key) ?
                            this.props.movie.videos[0].key : null}/>
                    <S.MovieTitle title={this.props.movie.title}/>
                    <S.Divider/>
                    <S.Stats vote_average={this.props.movie.vote_average} genres={this.props.movie.genres}/>
                    <S.Divider/>
                    <Overview overview={this.props.movie.overview}/>
                </Grid>
            </div>
        );
    }
}

S.PageLayout = styled(PageLayout)`
  && {
    //margin: 0px;
    //overflow-x: hidden;
    padding: 8px; //https://material-ui.com/layout/grid/#limitations;
    margin: 8px;
  }
`;

S.CircularProgress = styled(CircularProgress)`
  &&{
    margin: 20px auto auto;
    display: block;
  }
`;

@observer
class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        console.log("Movie id: " + this.props.match.params.id);
        let movie = store.get_movie(this.props.match.params.id);
    }

    render() {
        console.log("rendering!");
        console.log(store.movie);
        if (store.movie.id && store.movie.id.toString() === this.props.match.params.id.toString())
            return (
                <div>
                    <S.PageLayout movie={store.movie} {...this.props}/>
                </div>
            );
        else
            return <S.CircularProgress/>;
    }
}

MoviePage.propTypes = {
    classes: PropTypes.object.isRequired
};

MoviePage.defaultProps = {};
// MoviePage = observer(MoviePage);
export default MoviePage;
