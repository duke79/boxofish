// http://gitgraphjs.com/
// http://gitgraphjs.com/docs/index.html

import React from 'react';
import MyBreadCrumb from '../../components/MyBreadCrumb/MyBreadCrumb.js'
import { NavLink } from "react-router-dom";
import styles from './Network.css'

import { connect } from 'react-redux'
// import { loadIssuesList } from '../../redux/actions/actions'

// https://github.com/nicoespeon/gitgraph.js/issues/195
import "gitgraph.js";
import "gitgraph.js/build/gitgraph.css";

class Network extends React.Component {

    constructor(props) {
        super(props);
        this.$gitgraph = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        // const { dispatch } = this.props;

        this.gitgraph = new window.GitGraph({
            canvas: this.$gitgraph.current,
            template: "blackarrow",
            reverseArrow: false,
            orientation: "vertical",
            mode: "extended"
        });

        var master = this.gitgraph.branch("master");
        this.gitgraph.commit().commit().commit();         // 3 commits upon HEAD
        var develop = this.gitgraph.branch("develop");    // New branch from HEAD
        var myfeature = develop.branch("myfeature"); // New branch from develop

        // Well, if you need to go deeper…

        var hotfix = this.gitgraph.branch({
            parentBranch: develop,
            name: "hotfix",
            column: 2             // which column index it should be displayed in
        });

        master.commit("This commit is mine"); // Add a commit on master branch

        develop.commit({
            dotColor: "white",
            dotSize: 10,
            dotStrokeWidth: 10,
            sha1: "666",
            message: "Pimp dat commit",
            author: "Jacky <prince@dutunning.com>",
            // tag: "a-super-tag",
            onClick: function (commit) {
                console.log("Oh, you clicked my commit?!", commit);
            }
        });

        master.checkout();

        develop.checkout();
        var featureOfDeath = this.gitgraph.branch("feature-of-death");

        // master.merge(develop); // Merge master into develop

        master.merge(develop, "Epic merge commit");
        // —> Custom merge message FTW \o/

        // master.merge(develop, { dotColor: "red" });
        // —> The commit will be red, 'coz red is fashion!

        // master.merge(develop, { message: "New release", /*tag: "v1.0.0"*/ });
        // —> Let's tag this merge commit!

        // master.delete();

        // gitGraph.canvas.addEventListener("graph:render", function (event) {
        //     console.log(event.data.id, "graph has been rendered");
        // });

        // gitGraph.canvas.addEventListener("commit:mouseover", function (event) {
        //     console.log("You're over a commit.", event.data);
        //     this.style.cursor = "pointer";
        // });

        // gitGraph.canvas.addEventListener("commit:mouseout", function (event) {
        //     console.log("You just left this commit ->", event.data);
        //     this.style.cursor = "auto";
        // });

        develop.commit({
            message: "Pimp dat commit",
            author: "Jacky <prince@dutunning.com>",
            onClick: function (commit) {
                console.log("Oh, you clicked my commit?!", commit);
            }
        });

        // var myTemplateConfig = {
        //     colors: ["#F00", "#0F0", "#00F"], // branches colors, 1 per column
        //     branch: {
        //         lineWidth: 8,
        //         spacingX: 50,
        //         showLabel: true,                  // display branch names on graph
        //     },
        //     commit: {
        //         spacingY: -80,
        //         dot: {
        //             size: 12
        //         },
        //         message: {
        //             displayAuthor: true,
        //             displayBranch: false,
        //             displayHash: false,
        //             font: "normal 12pt Arial"
        //         },
        //         shouldDisplayTooltipsInCompactMode: false, // default = true
        //         tooltipHTMLFormatter: function (commit) {
        //             return "" + commit.sha1 + "" + ": " + commit.message;
        //         }
        //     }
        // };
        // var myTemplate = new GitGraph.Template(myTemplateConfig);

        // var gitGraph = new GitGraph({ template: myTemplate });
    }

    render() {
        const { StoreIssues } = this.props;

        return <div className={styles.wrapper} >
            <MyBreadCrumb items={[<NavLink to="/network" className="nav-text">Network</NavLink>]} />
            <div className={styles["Wrapper"]}>
                <div className={styles["Container"]}>
                    <canvas ref={this.$gitgraph}></canvas>
                </div>
            </div>
        </div>
    }
}

Network.defaultProps = {
}

function select(state) {
    return {
    }
}

export default connect(select)(Network);