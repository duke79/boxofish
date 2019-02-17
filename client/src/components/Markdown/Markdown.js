import React from 'react';
import marked from 'marked';

class Markdown extends React.Component {
  getMarkdownText() {
    var rawMarkup = marked(this.props.text, {sanitize: true});
    return { __html: rawMarkup };
  }

  render() {
    return <div dangerouslySetInnerHTML={this.getMarkdownText()} />
  }
}

export default Markdown;