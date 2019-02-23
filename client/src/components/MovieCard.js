import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {createMuiTheme} from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: blue
    }
});

const styles = {
    card: {
        [theme.breakpoints.down("sm")]: {
            // maxWidth: 150,
            // maxHeight: 200
        },
        [theme.breakpoints.up("sm")]: {
            // maxWidth: 345,
            // maxHeight: 500
        }
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    }
};

function MovieCard(props) {
    const {classes} = props;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="https://ak1.picdn.net/shutterstock/videos/11694011/thumb/1.jpg"
                    //image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.title ? props.title : null}
                    </Typography>
                    <Typography component="p">
                        {props.detail ? props.detail : null}
                    </Typography>
                </CardContent>

                <CardActions>
                    {props.buttons
                        ? props.buttons.map(function (btn) {
                            return (
                                <Button size="small" color="primary">
                                    {btn}
                                </Button>
                            );
                        })
                        : null}
                </CardActions>
            </Card>
        </div>
    );
}

MovieCard.propTypes = {
    classes: PropTypes.object.isRequired
};

MovieCard.defaultProps = {
    title: "Lizards",
    detail:
        "Lizards are a widespread group of squamate reptiles, with over 6,000\
                species, ranging across all continents except Antarctica",
    buttons: ["Share", "Learn more"]
};

export default withStyles(styles)(MovieCard);
