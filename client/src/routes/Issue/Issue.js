import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyBreadCrumb from '../../components/MyBreadCrumb/MyBreadCrumb.js'
import IssueHeader from '../../components/IssueHeader/IssueHeader'
import Comment from '../../components/Comment/Comment'
import Editor from '../../components/Markdown/MarkdownEditor'
import { NavLink } from "react-router-dom";
import styles from './Issue.css'

class Issue extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // "issue" : props.match.params.issue,
    }
  }

  componentDidMount() {
    // this.state = {
    //   "issue" : this.props.match.params.issue,
    // }
  }

  render() {
    return <div className={styles["Wrapper"]}>
      <MyBreadCrumb
        items={[
          <NavLink to="/issues" className="nav-text">Issues</NavLink>,
          <NavLink to={"/issues/" + this.props.match.path} className="nav-text">{"#" + this.props.match.path}</NavLink>
        ]} />

      <IssueHeader
        title={this.props.title}
        author={this.props.author}
        authored={this.props.authored}
        status={this.props.status}
      />

      <div className={styles["Discussion"]}>
        <Comment text={this.props.description} />
        {this.props.comments.map((comment) =>
          <Comment
            avatar={comment.avatar}
            author_id={comment.author_id}
            text={comment.text}
            author={comment.author}
            authored={comment.authored} />
        )}
        <div className={styles["Editor"]}>
          {/* <div className="Issue-Editor-Header">
          </div> */}
          <Editor />
          <div className={styles["Editor-Footer"]}>
            <button
              type={"submit"}
              className={styles["Editor-Submit"]}>
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  }
}

Issue.defaultProps = {
  "title": "My Issue Title",
  "author": "Pulkit Singh",
  "authored": "Oct 21, 2016",
  "status": "Open",
  "description": "[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)\n\nDillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.\n\n* Type some Markdown on the left\n\n* See HTML in the right\n\n* Magic\n\n> The overriding design goal for Markdown's\n> formatting syntax is to make it as readable\n> as possible. The idea is that a\n\nThis text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.\n### Tech\nDillinger uses a number of open source projects to work properly:\n* [AngularJS] - HTML enhanced for web apps!\n\n* [Breakdance](http://breakdance.io) - HTML to Markdown converter\n* [jQuery] - duh\n\nAnd of course Dillinger itself is open source with a [public repository][dill]\non GitHub.\n\n### Installation\n\nDillinger requires [Node.js](https://nodejs.org/) v4+ to run.\n\nInstall the dependencies and devDependencies and start the server.\n\nFor production environments...\n\n\`\`\`sh\n\n$ npm install --production\n$ NODE_ENV=production node app\n\`\`\`",
  "comments": [
    {
      "avatar": "https://avatars2.githubusercontent.com/u/378909?s=88&v=4",
      "author_id": "bigbabla",
      "author": "Babla Boo",
      "authored": "May 17, 2026",
      "text": "## Nice comment \n \n I'd like to tell you how *nice* that comment is.",
    },
    {
      "avatar": "https://assets.gitlab-static.net/uploads/-/system/user/avatar/525004/avatar.png",
      "author_id": "zildana_007",
      "author": "Zildana Dessus",
      "authored": "March 31, 1929",
      "text": "Thanks a lot Babla",
    },
  ]
}

export default Issue