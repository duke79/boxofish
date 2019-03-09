import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import IconStarRate from "@material-ui/icons/StarRate";
import IconAccessTime from "@material-ui/icons/AccessTime";
import IconNextWeek from "@material-ui/icons/NextWeek";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styled from "styled-components"
import {Route} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';

let S = {};

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`
        }
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing.unit * 3
    }
});

class Headline extends React.Component {
    render() {
        return (
            <Typography
                variant={"headline"}
                align={"center"}
                {...this.props}>
                boxofish
            </Typography>
        );
    }
}

S.Headline = styled(Headline)`
  &&{
    margin-top: 27px;
    margin-bottom: 32px;
  }
`;

S.SearchIcon = styled(SearchIcon)`
  margin-left: auto;
  margin-right: 12px;
  cursor: pointer;
`;

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({mobileOpen: !state.mobileOpen}));
    };

    render() {
        const {classes, theme} = this.props;

        const drawer = (
            <div>
                <S.Headline/>
                <Divider/>
                <Route render={({history}) => (
                    <List>
                        <ListItem button key={"Top Rated Movies"}
                                  onClick={(e) => {
                                      history.push("/movies/top_rated");
                                      this.setState(state => ({mobileOpen: false}));
                                  }}>
                            <ListItemIcon>
                                <IconStarRate/>
                            </ListItemIcon>
                            <ListItemText primary={"Top Rated Movies"}/>
                        </ListItem>
                        <ListItem button key={"Recent Movies"}
                                  onClick={(e) => {
                                      history.push("/movies/now_playing");
                                      this.setState(state => ({mobileOpen: false}));
                                  }}>
                            <ListItemIcon>
                                <IconAccessTime/>
                            </ListItemIcon>
                            <ListItemText primary={"Recent Movies"}/>
                        </ListItem>
                        <ListItem button key={"Upcoming Movies"}
                                  onClick={(e) => {
                                      history.push("/movies/upcoming");
                                      this.setState(state => ({mobileOpen: false}));
                                  }}>
                            <ListItemIcon>
                                <IconNextWeek/>
                            </ListItemIcon>
                            <ListItemText primary={"Upcoming Movies"}/>
                        </ListItem>
                    </List>
                )}/>
            </div>
        );

        return (
            <Route render={({history}) => (
                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                boxofish
                            </Typography>
                            <S.SearchIcon
                                onClick={(e) => {
                                    history.push("/search");
                                }}/>
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer}>
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={this.props.container}
                                variant="temporary"
                                anchor={theme.direction === "rtl" ? "right" : "left"}
                                open={this.state.mobileOpen}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar}/>
                        {this.props.children}
                    </main>
                </div>
            )}/>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, {withTheme: true})(ResponsiveDrawer);
