import React from "react";
import styled from "styled-components";

import CircularProgress from '@material-ui/core/CircularProgress';

let S = {};

S.CircularProgress = styled(CircularProgress)`
  &&{
    margin: 20px auto auto;
    display: block;
  }
`;

class InfiniteScroll extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        if (this.to_load_more) this.props.load_more(this.props);
    }

    componentWillReceiveProps(props) {
        if (this.to_load_more) this.props.load_more(props);
    }

    get to_load_more() {
        return this.props.to_load_more();
    }

    isBottom(el) {
        // return el.getBoundingClientRect().bottom <= window.innerHeight;
        let this_bottom = this.myRef.current.getBoundingClientRect().bottom;
        // console.log(this_bottom);
        // console.log(window.innerHeight);
        return this_bottom <= window.innerHeight;
    }

    add_scroll_listener() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    remove_scroll_listener() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    componentDidMount() {
        this.add_scroll_listener();
    }

    componentWillUnmount() {
        this.remove_scroll_listener();
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('header');
        if (this.isBottom(wrappedElement)) {
            // console.log('bottom reached');
            this.props.load_more(this.props);
            this.remove_scroll_listener();
        }
    };

    render() {
        this.add_scroll_listener();

        return (
            <div {...this.props} ref={this.myRef}>
                {this.props.children}
                <S.CircularProgress/>
            </div>
        );
    }
}

InfiniteScroll.defaultProps = {
    load_more: function (props) {
        //
    },
    to_load_more: function () {
        return true;
    }
};

export default InfiniteScroll;

