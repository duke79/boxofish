import React from 'react';
import { BrowserRouter as Router, Route, /*Link*/ } from "react-router-dom";
import $ from 'jquery'

import Project from './Project/Project.js'
import Issue from './Issue/Issue.js'
import Issues from './Issues/Issues.js'
import Members from './Members/Members.js'
import NewIssue from './NewIssue/NewIssue.js';
import Network from './Network/Network.js'
import Login from './Login/Login.js'
import Signup from './Signup/Signup.js';
import GraphiQL from './GraphiQL/GraphiQL.js'

import MySideNav from '../components/MySideNav/MySideNav.js'
import MyTopNav from '../components/MyTopNav/MyTopNav.js'
// import MyBreadCrumb from '../components/MyBreadCrumb/MyBreadCrumb.js'
import styles from './Routes.css'

import { connect } from 'react-redux';
import { appInit } from '../redux/actions/actions'
// import { Redirect } from 'react-router-dom'
import { userAlreadyLoggedIn } from '../data/myFirebase'

class Routes extends React.Component {

    displaySideNav() {
        this.sideNav.display();
        $("." + styles["Wrapper"]).css("z-index", "-1"); /*To make SideNav-Scrim clickable */
    }

    onSideNavHidden() {
        // setTimeout(function () { /*delay required, otherwise SideNav becomes see through*/
        $("." + styles["Wrapper"]).css("z-index", "");
        // }, 200);
    }

    componentDidMount() {
        userAlreadyLoggedIn(() => {
            const { dispatch } = this.props;
            dispatch(appInit("http//127.0.0.1:5000"));
        })
    }

    render() {
        var onlyNormalPath = new RegExp("/(?!(login|signup)).*$"); //Path except /login* and /signup*
        return <Router>
            <div>
                {/* Exceptional routes */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />

                {/* Normal routes */}
                <Route path={onlyNormalPath} render={() =>
                    <div>
                        <MyTopNav onMenuIconClick={this.displaySideNav.bind(this)} />
                        <MySideNav
                            ref={(ref) => this.sideNav = ref}
                            onScrimClick={this.onSideNavHidden.bind(this)}
                            menu={this.menu} />

                        <div className={styles["Wrapper"]}>
                            <Route exact path="/" component={Project} />
                            <Route exact path="/issues" component={Issues} />
                            <Route exact path="/issues/:issue" component={Issue} />
                            <Route exact path="/members" component={Members} />
                            <Route exact path="/newissue" component={NewIssue} />
                            <Route exact path="/network" component={Network} />
                            <Route exact path="/graphiql" component={GraphiQL} />
                        </div>
                    </div>
                } />
            </div>
        </Router >
    }

    menu = {
        header: {
            "type": "item",
            "value": "Vilokan Labs",
            "link": "/"
        },
        container: [
            {
                "type": "item",
                "value": "Project",
                "link": "/project"
            },
            {
                "type": "submenu",
                "value": "Issues",
                "link": "",
                "items": [
                    {
                        "type": "subitem",
                        "value": "List",
                        "link": "/issues"
                    },
                    {
                        "type": "subitem",
                        "value": "Boards",
                        "link": "/boards"
                    },
                    {
                        "type": "subitem",
                        "value": "Labels",
                        "link": "/labels"
                    },
                    {
                        "type": "subitem",
                        "value": "Service Desk",
                        "link": "/service_desk"
                    },
                    {
                        "type": "subitem",
                        "value": "Milestones",
                        "link": "/milestones"
                    }
                ]
            },
            {
                "type": "item",
                "value": "Members",
                "link": "/members"
            },
            {
                "type": "item",
                "value": "Wiki",
                "link": "/wiki"
            },
            {
                "type": "submenu",
                "value": "Insights",
                "link": "",
                "items": [
                    {
                        "type": "subitem",
                        "value": "Pulse",
                        "link": "/pulse"
                    },
                    {
                        "type": "subitem",
                        "value": "Contributors",
                        "link": "/contributors"
                    },
                    {
                        "type": "subitem",
                        "value": "Community",
                        "link": "/community"
                    },
                    {
                        "type": "subitem",
                        "value": "Commits",
                        "link": "/commits"
                    },
                    {
                        "type": "subitem",
                        "value": "Code Frequency",
                        "link": "/code_frequency"
                    },
                    {
                        "type": "subitem",
                        "value": "Dependency Graph",
                        "link": "/dependency_graph"
                    },
                    {
                        "type": "subitem",
                        "value": "Network",
                        "link": "/network"
                    },
                    {
                        "type": "subitem",
                        "value": "Forks",
                        "link": "/forks"
                    },
                ]
            },
            {
                "type":"item",
                "value":"GraphiQL",
                "link":"/graphiql"
            }
        ],
        footer: {
            "type": "item",
            "value": "<< Collapse Sidebar",
            "link": ""
        },
    };
}

Routes.defaultProps = {
}

function select(state) {
    return {}
}

export default connect(select)(Routes)