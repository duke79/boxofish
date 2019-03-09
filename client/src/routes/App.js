import React from 'react';
import {HashRouter as Router, Redirect, Route, /*Link*/} from "react-router-dom";

import MovieList from "./MovieList";
import Menu from "../components/Menu";
import MoviePage from "./MoviePage";
import Search from "./Search";

class App extends React.Component {
    render() {
        return <Router>
            <div>
                <Route exact path="/" render={() => (
                    <Redirect to="/movies/now_playing"/>
                )}/>
                <Route exact path="/movies/:collection_name" component={MovieList}/>
                <Route exact path="/movie/:id" component={MoviePage}/>
                <Route exact path="/search" component={Search}/>
            </div>
        </Router>
    }
}

export default App