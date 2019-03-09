import React from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

const YoutubeWrapper = styled.div`
  && {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
    overflow: hidden;
  }
  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    // width: 100%;
    // height: 100%;
    max-height: 400px;
  }
`;

class YTPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: []
        };
        this.onReady = this.onReady.bind(this);
        this.pause = this.pause.bind(this);
    }

    onReady(e) {
        const players = this.state.players;
        players.push(e.target);
        this.setState({
            players: players
        });

        if (this.props.onReady)
            this.props.onReady();
    }

    pause() {
        this.state.players.forEach((player) => {
            player.pauseVideo();
        });
    }

    componentDidMount() {
        // Add the deviceready event
        document.addEventListener("deviceready", function(){

            // attach events
            document.addEventListener("pause", function () {
                console.log("pausingg!");
                this.pause();
            }.bind(this), false);
        }.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("pause", this.pause, false);
    }

    render() {
        return (
            <YoutubeWrapper {...this.props}>
                <YouTube {...this.props} onReady={this.onReady}/>
            </YoutubeWrapper>
        );
    }
}

YTPlayer.defaultProps = {
    videoId: "2g811Eo7K8U",
    host: "https://www.youtube.com"
};

export default YTPlayer;
