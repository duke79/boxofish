import React from "react";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
// import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
// import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import {createMuiTheme} from "@material-ui/core/styles";
// import blue from "@material-ui/core/colors/blue";

import MovieCard from "./MovieCard";

// const theme = createMuiTheme({
//     // palette: {
//     //   primary: blue
//     // }
// });

// const styles = {
//   grid: {
//     [theme.breakpoints.down("sm")]: {},
//     [theme.breakpoints.up("sm")]: {}
//   }
// };

// const styles = theme => ({
//     // container: {
//     //   display: "grid",
//     //   gridTemplateColumns: "repeat(12, 1fr)",
//     //   gridGap: `${theme.spacing.unit * 3}px`
//     // },
//     // paper: {
//     //   padding: theme.spacing.unit,
//     //   textAlign: "center",
//     //   color: theme.palette.text.secondary,
//     //   whiteSpace: "nowrap",
//     //   marginBottom: theme.spacing.unit
//     // },
//     // divider: {
//     //   margin: `${theme.spacing.unit * 2}px 0`
//     // }
// });

function Poster(props) {
    return (
        <Grid
            item xs={6}
            sm={4}
            md={3}
            lg={2}
            {...props}>
            <MovieCard title="Bubbles" detail="" buttons=""/>
        </Grid>
    );
}

const PosterS = styled(props => <Poster {...props}/>)`
&& {
  margin: 0px;
}
`;

function MovieGrid(props) {
    return (
        <div {...props}>
            <Grid container
                  spacing={16}
                  justify={"flex-start"}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (elem) {
                    return (
                        <PosterS/>
                    );
                })}
            </Grid>
        </div>
    );
}

const MovieGridS = styled(MovieGrid)`
&& {
  //margin: 0px;
  //overflow-x: hidden;
  padding: 8px; //https://material-ui.com/layout/grid/#limitations
}
`;

function MovieList(props) {
    // const {classes} = props;
    return (
        <div>
            <MovieGridS/>
        </div>
    );
}

MovieList.propTypes = {
    classes: PropTypes.object.isRequired
};

MovieList.defaultProps = {};

const StyledMovieList = styled(MovieList)``;
// export default withStyles(styles)(MovieList);
export default StyledMovieList;
