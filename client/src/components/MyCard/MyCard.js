import React from 'react';
// import $ from 'jquery'
import styles from './MyCard.css'


class MyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <div className={styles.Card_Wrapper}>
            {this.props.children}
        </div>
    }
}

MyCard.defaultProps = {
    "children":[
        "Hello buddy,",
        "<div>This is me.</div>"
    ]
}

export default MyCard