import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyBreadCrumb from '../../components/MyBreadCrumb/MyBreadCrumb.js'
// import IssueHeader from '../../components/IssueHeader/IssueHeader'
// import Comment from '../../components/Comment/Comment'
import Editor from '../../components/Markdown/MarkdownEditor'
import MyInput from '../../components/MyInput/MyInput'
import MyButton from '../../components/MyButton/MyButton'
import { NavLink } from "react-router-dom";
import styles from './NewIssue.css'
// import $ from 'jquery'

import { connect } from 'react-redux';
import { createIssue } from '../../redux/actions/actions'

class NewIssue extends React.Component {

  constructor(props) {
    super(props);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      comment: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!(Object.keys(nextProps.NewIssueID).length === 0 && nextProps.NewIssueID.constructor === Object)) {
      console.log(nextProps.NewIssueID);
    }
    // if (!$.isEmptyObject(nextProps.NewIssueID)) {
    //   console.log(nextProps.NewIssueID);
    // }
  }

  updateTitle(e) {
    this.setState({ "title": e.target.value });
    // console.log(this.state.title);
  }

  updateComment(value) {
    this.setState({ "comment": value });
    console.log(value);
  }

  onSubmit(e) {
    const { dispatch } = this.props;
    dispatch(createIssue(this.state.title, this.state.comment))
  }

  render() {
    return <div className={styles["Wrapper"]}>
      <MyBreadCrumb
        items={[
          <NavLink to="/issues" className="nav-text">Issues</NavLink>,
          <NavLink to={this.props.match.path} className="nav-text">{/*this.props.match.path.split("/")[1]*/"New Issue"}</NavLink>
        ]} />
      <div className={styles["Container"]}>
        {/* <div class={styles["TitleLabel"]}>Title</div> */}
        <div className={styles["Title"]} >
          <NavLink to={"/" + this.props.author_id} className={styles["AvatarWrapper"]}>
            <img className={styles["Avatar"]} src={this.props.avatar} />
          </NavLink>
          <MyInput childClassName={styles["TitleInput"]} placeholder="Title" onChange={this.updateTitle} />
        </div>
        {/* <div class={styles["EditorLabel"]}>Description</div> */}
        <div className={styles["Editor"]}>
          <Editor
            value={this.state.comment}
            placeholder="Write a comment"
            onChange={this.updateComment} />
          <div className={styles["Editor-Footer"]}>
            <a
              className={styles["markdownRef"]}
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank">
              - Styling with markdown is supported -
            </a>
            <MyButton
              onClick={this.onSubmit}
              className={styles["Editor-Submit"]}>
              Submit
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  }
}

NewIssue.defaultProps = {
  "avatar": "https://assets.gitlab-static.net/uploads/-/system/user/avatar/525004/avatar.png",
  "author_id": "zildana_007",
}

function select(state) {
  return {
    NewIssueID: state.NewIssue,
  }
}

export default connect(select)(NewIssue)