import React from 'react';
import styles from './MyInput.css'


class MyInput extends React.Component {
    render() {
        return <div className={styles["wrapper"] + " " + this.props.className}>
            <input
                className={styles["box"] + " " + this.props.childClassName}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                onClick={this.props.onClick}
            />
        </div>
    }
}

MyInput.defaultProps = {
    placeholder: "Search or filter results..."
}

export default MyInput