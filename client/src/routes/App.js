import React from 'react';
import {HashRouter as Router, Route, /*Link*/} from "react-router-dom";

import MovieList from "./MovieList";
import Menu from "../components/Menu";

class App extends React.Component {
    render() {
        return <Router>
            <Menu>
                <Route render={() =>
                    <div>
                        <Route exact path="/" component={MovieList}/>
                    </div>
                }/>
            </Menu>
        </Router>
    }
}

export default App