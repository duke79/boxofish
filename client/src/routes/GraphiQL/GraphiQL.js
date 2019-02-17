import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQLGraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import '../../../node_modules/graphiql/graphiql.css'

class GraphiQL extends React.Component {

  constructor(props) {
    super(props);
    this.state = {      
    }
    this.graphQLFetcher = this.graphQLFetcher.bind(this);
  }

  componentDidMount() {
  }

  graphQLFetcher(graphQLParams) {
    return fetch(this.props.graphserver + '/graph', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  }

  render() {
    return <GraphiQLGraphiQL fetcher={this.graphQLFetcher} />
  }
}

GraphiQL.defaultProps = {
  "graphserver": "http://127.0.0.1:5000",  
}

export default GraphiQL