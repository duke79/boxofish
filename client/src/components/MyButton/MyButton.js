import React from 'react';
import $ from 'jquery'
import styles from './MyButton.css'


class MyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <button className={styles["MyButton"] + " " + this.props.className} onClick={this.props.onClick}>
            {this.props.children}
        </button>
    }
}

MyButton.defaultProps = {
    "children": "Submit"
}

export default MyButton