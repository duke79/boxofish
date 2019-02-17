import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyBreadCrumb from '../../components/MyBreadCrumb/MyBreadCrumb.js'
import { NavLink } from "react-router-dom";
import MyInput from '../../components/MyInput/MyInput'
import styles from './Issues.css'
import fa_styles from '../../lib/font-awesome/css/font-awesome.min.css';
import MyButton from '../../components/MyButton/MyButton'

export default function IssuesDOM(props) {
    console.log(props.issues);
    return (
      <div className={styles.Wrapper} >
        <MyBreadCrumb
          items={[<NavLink to="/issues" className="nav-text">Issues</NavLink>]} />
        <div className={styles["Actions"]}>
          <MyInput className={styles["Actions_Item"]} />
          <div className={styles["Actions_Gap"]}></div>
          <NavLink exact to={"/newissue"}>
            <MyButton
              // as={NavLink} to={"/newissue"}
              className={styles["Actions_EndItem"]}>
              New Issue
            </MyButton>
          </NavLink>
        </div>
        <div className={styles["Container"]}>
          <div className={styles["Container-Header"]}>
            <div className={styles["Container-Header-States"]}>
              <div className={styles["Container-Header-Open"]}>{props.open_issues + " Open"}</div>
              <div className={styles["Container-Header-Close"]}>{props.close_issues + " Closed"}</div>
            </div>
            <div className={styles["Filters"]}>
              {props.filters.map((filter) =>
                <div className={styles["Filter"]}>
                  <div className={styles["Filter-Text"]}>{filter}</div>
                  <i className={fa_styles["fa"] + " " + fa_styles["fa-caret-down"] + " rotate " + styles["Filter-CaretDown"]} />
                </div>
              )}
            </div>
          </div>
          {props.issues.map((issue) =>
            <div className={styles["Container-Item"]}>
              <div className={styles["Container-Item-Container"]}>
                <NavLink to={"issues/" + issue.count}>
                  <div className={styles["Container-Item-Title"]}>{issue.title}</div>
                </NavLink>
                <div className={styles["Container-Item-Info"]}>
                  <div className={styles["Container-Item-Info-Item"]}>{"#" + issue.count}</div>
                  <div className={styles["Container-Item-Info-Item"]}>opened on</div>
                  <div className={styles["Container-Item-Info-Item"]}>{issue.createdAt}</div>
                  <div className={styles["Container-Item-Info-Item"]}>by</div>
                  <div className={styles["Container-Item-Info-Item"]}>{issue.author.name}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }