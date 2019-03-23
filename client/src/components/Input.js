import React from "react";

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: null
        };

        this.timer = null;
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        if (this.state.value !== e.currentTarget.value) {
            this.state.value = e.currentTarget.value;
            clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                this.props.onChangeCustom(this.state.value);
            }.bind(this), this.props.onChangeWait);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    render() {
        return <input
            {...this.props}
            onChange={this.onChange}/>;
    }
}

Input.defaultProps = {
    onChangeCustom: function (value) {
        console.log(value);
    },
    onChangeWait: 1000
};

export default Input;