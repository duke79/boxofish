import React from 'react';
// import $ from 'jquery'
import styles from './IssueHeader.css'


class IssueHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <div className={styles.IssueHeader_Wrapper}>
            <div className={styles.IssueHeader_Title}>{this.props.title}</div>
            <div className={styles.IssueHeader_Meta}>
                <span className={styles.IssueHeader_Status}>{this.props.status}</span>
                <span className={styles.IssueHeader_Author}>{this.props.author}</span>
                <span>{"opened this issue on"}</span>
                <span className={styles.IssueHeader_Authored}>{this.props.authored}</span>
            </div>
        </div>
    }
}

IssueHeader.defaultProps = {
    "title": "My Issue Title",
    "author": "Pulkit Singh",
    "authored": "Oct 21, 2016",
    "status": "Open"
}

export default IssueHeader