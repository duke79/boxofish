import React from 'react';
import {BrowserRouter as Router, Redirect, Route, /*Link*/} from "react-router-dom";

import MovieList from "./MovieList";
import Menu from "../components/Menu";
import MoviePage from "./MoviePage";

class App extends React.Component {
    render() {
        return <Router>
            <Menu>
                <Route exact path="/movies/:collection_name" component={MovieList}/>
                <Route exact path="/movie/:id" component={MoviePage}/>
                <Route exact path="/" render={() => (
                    <Redirect to="/movies/now_playing"/>
                )}/>
            </Menu>
        </Router>
    }
}

export default App