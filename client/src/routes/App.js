import React from 'react';
import {HashRouter as Router, Route, /*Link*/} from "react-router-dom";

import MovieList from "./MovieList";
import Menu from "../components/Menu";
import MoviePage from "./MoviePage";

class App extends React.Component {
    render() {
        return <Router>
            <Menu>
                <Route path="/movie/:id" component={MoviePage}/>
                <Route exact path="/" component={MovieList}/>
            </Menu>
        </Router>
    }
}

export default App