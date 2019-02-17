import React from 'react';
import MyButton from '../../components/MyButton/MyButton';
import MyInput from '../../components/MyInput/MyInput';
// import firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css'

import { connect } from 'react-redux';
import { userSignup } from '../../redux/actions/actions'

import { withRouter, Redirect } from 'react-router-dom'
// this also works with react-router-native

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
        }
    }

    componentDidMount() {
    }

    updateEmail(e) {
        this.setState({ "email": e.target.value });
        // console.log(this.state.title);
    }

    updatePassword(e) {
        this.setState({ "password": e.target.value });
        console.log(e.target.value);
    }

    onSubmit(e) {
        const { dispatch } = this.props;
        dispatch(userSignup(this.state.email, this.state.password));
    }

    componentWillReceiveProps() {
        const { status } = this.props;
        if (status && status == "SUCCEEDED") {
            this.setState();
        }
    }

    render() {
        const { status } = this.props;
        if (status === "SIGNUP_SUCCEEDED") {
            return <Redirect to="/" />
        } else {
            return <div>
                <form>
                    <label>
                        Email:
                    <MyInput id="email" onChange={this.updateEmail} />
                    </label>
                    <label>
                        Password:
                    <MyInput id="password" onChange={this.updatePassword} />
                    </label>
                </form>
                <MyButton onClick={this.onSubmit}>Submit</MyButton>
            </div>
        }
    }
}

Signup.defaultProps = {
}

function select(state) {
    return {
        status: state.User.status,
        user: state.User.user,
    }
}

export default connect(select)(Signup)
