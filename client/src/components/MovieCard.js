import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import CardActionArea from "../../node_modules/@material-ui/core/CardActionArea/CardActionArea";

let S = {};

S.Card = styled(Card)`
  //height: 312px;
`;

S.CardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 150%;
`;

S.CardContent = styled(CardContent)`
    && {
      margin-top: -58px;    
      background-color: white;
      padding-bottom: 16px;
    }
`;

function MovieCard(props) {
    return (
        <div>
            <S.Card>
                <S.CardMedia
                    image={props.poster ? props.poster : null}
                    //image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    title={props.title ? props.title : null}
                />
                <S.CardContent>
                    <Typography gutterBottom component="p">
                        {props.title ? props.title : null}
                    </Typography>
                    <Typography component="p">
                        {props.detail ? props.detail : null}
                    </Typography>
                </S.CardContent>

                {/*<CardActions>*/}
                {/*{props.buttons*/}
                {/*? props.buttons.map(function (btn) {*/}
                {/*return (*/}
                {/*<Button size="small" color="primary">*/}
                {/*{btn}*/}
                {/*</Button>*/}
                {/*);*/}
                {/*})*/}
                {/*: null}*/}
                {/*</CardActions>*/}
            </S.Card>
        </div>
    );
}

MovieCard.defaultProps = {
    title: "Lizards",
    detail:
        "Lizards are a widespread group of squamate reptiles, with over 6,000\
                species, ranging across all continents except Antarctica",
    buttons: ["Share", "Learn more"],
    poster: "https://ak1.picdn.net/shutterstock/videos/11694011/thumb/1.jpg"
};

export default MovieCard;

function Poster(props) {
    return (
        <Grid
            item xs={6}
            sm={4}
            md={3}
            lg={2}
            {...props}>
            <MovieCard
                detail=""
                buttons=""
                {...props}/>
        </Grid>
    );
}

export const ResponsivePoster = styled(props => <Poster {...props}/>)`
&& {
  margin: 0px;
}
`;
