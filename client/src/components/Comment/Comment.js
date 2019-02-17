import React from 'react';
import { NavLink } from "react-router-dom";
// import $ from 'jquery'
import Markdown from '../../components/Markdown/Markdown'
import styles from './Comment.css'


class IssueHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <div className={styles.Comment_Wrapper}>
            <NavLink to={"/" + this.props.author_id} className={styles.Comment_Avatar_Wrapper}>
                <img className={styles.Comment_Avatar} src={this.props.avatar} />
            </NavLink>
            <div className={styles.Comment_Header}>
                <span className={styles.Comment_Author}>{this.props.author}</span>
                <span>{"commented on"}</span>
                <span className={styles.Comment_Authored}>{this.props.authored}</span>
            </div>
            <div className={styles.Comment_Container}>
                <Markdown text={this.props.text} />
            </div>
        </div>
    }
}

IssueHeader.defaultProps = {
    "avatar": "https://assets.gitlab-static.net/uploads/-/system/user/avatar/525004/avatar.png",
    "author_id": "zildana_007",
    "author": "Zildana Dessus",
    "authored": "May 17, 2026",
    "text": "## Comment Title \n\n This is comment text.",
}

export default IssueHeader