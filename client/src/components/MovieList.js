import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

import MovieCard from "./MovieCard";

const theme = createMuiTheme({
    palette: {
        primary: blue
    }
});

// const styles = {
//   grid: {
//     [theme.breakpoints.down("sm")]: {},
//     [theme.breakpoints.up("sm")]: {}
//   }
// };

const styles = theme => ({
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: `${theme.spacing.unit * 3}px`
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: "center",
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        marginBottom: theme.spacing.unit
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0`
    }
});

function MovieList(props) {
    const { classes } = props;

    return (
        <div>
            <Typography variant="subtitle1" gutterBottom>
                Material-UI Grid:
            </Typography>
            <Grid container spacing={24}>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <MovieCard />
                </Grid>
            </Grid>
        </div>
    );
}

// <Divider className={classes.divider} />
//   <Typography variant="subtitle1" gutterBottom>
//     CSS Grid Layout:
//       </Typography>
//   <div className={classes.container}>
//     <div style={{ gridColumnEnd: "span 3" }}>
//       <Paper className={classes.paper}>xs=3</Paper>
//     </div>
//     <div style={{ gridColumnEnd: "span 3" }}>
//       <Paper className={classes.paper}>xs=3</Paper>
//     </div>
//     <div style={{ gridColumnEnd: "span 3" }}>
//       <Paper className={classes.paper}>xs=3</Paper>
//     </div>
//     <div style={{ gridColumnEnd: "span 3" }}>
//       <Paper className={classes.paper}>xs=3</Paper>
//     </div>
//     <div style={{ gridColumnEnd: "span 8" }}>
//       <Paper className={classes.paper}>xs=8</Paper>
//     </div>
//     <div style={{ gridColumnEnd: "span 4" }}>
//       <Paper className={classes.paper}>xs=4</Paper>
//     </div>
//   </div>

MovieList.propTypes = {
    classes: PropTypes.object.isRequired
};

MovieList.defaultProps = {};

export default withStyles(styles)(MovieList);
