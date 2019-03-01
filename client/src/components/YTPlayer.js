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
    render() {
        return (
            <YoutubeWrapper {...this.props}>
                <YouTube {...this.props} />
            </YoutubeWrapper>
        );
    }
}

YTPlayer.defaultProps = {
    videoId: "2g811Eo7K8U"
};

export default YTPlayer;
