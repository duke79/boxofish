import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import YTPlayer from "../components/YTPlayer";
import Divider from "@material-ui/core/Divider";
import {unstable_Box as Box} from "@material-ui/core/Box";

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

function MovieTitle(props) {
    return (
        <S.Card {...props}>
            <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                    Cat Falling
                </Typography>
            </CardContent>
        </S.Card>
    );
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
                <Typography gutterBottom variant="headline" component="h2">
                    Overview
                </Typography>
                <Typography gutterBottom variant="p">
                    This movie centers around teen hero Kim Possible and friends as they
                    try to balance high school with saving the world everyday.
                </Typography>
            </CardContent>
        </S.Card>
    );
}

function Ratings(props) {
    return (
        <Typography gutterBottom variant="h5" noWrap {...props}>
            7.4
        </Typography>
    );
}

S.Ratings = styled(Ratings)`
  && {
    align-self: flex-end;
    font-family: Srisakdi;
    // border-bottom: #0000002b solid 1px;
    color: blue;
  }
`;

function Genres(props) {
    return (
        <Typography gutterBottom variant="p" noWrap {...props}>
            Action, Thriller, Science Fiction
        </Typography>
    );
}

S.Genres = styled(Genres)`
  padding-left: 30px;
  align-self: flex-end;
  padding-bottom: 10px;
  font-family: Monospace;
`;

function Stats(props) {
    return (
        <S.Card {...props}>
            <CardContent>
                <S.Ratings/>
                <S.Genres/>
            </CardContent>
        </S.Card>
    );
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

function PageLayout(props) {
    return (
        <div {...props}>
            <Grid container spacing={16} justify={"flex-start"} direction="column">
                <S.YTPlayer/>
                <S.MovieTitle />
                <S.Divider />
                <S.Stats />
                <S.Divider />
                <Overview />
            </Grid>
        </div>
    );
}

const PageLayoutS = styled(PageLayout)`
  && {
    //margin: 0px;
    //overflow-x: hidden;
    padding: 8px; //https://material-ui.com/layout/grid/#limitations;
  }
`;

class MoviePage extends React.Component {
    render() {
        // const {classes} = props;
        return (
            <div>
                <PageLayoutS/>
            </div>
        );
    }
}

MoviePage.propTypes = {
    classes: PropTypes.object.isRequired
};

MoviePage.defaultProps = {};
export default MoviePage;
