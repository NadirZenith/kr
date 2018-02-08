import React from 'react';

import * as api from './api';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
// export default function () {
//     console.log('it works');
// }



class TF extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);

  }

  componentDidMount() {
    // alert('hi');
    api.getStatus(resp => this.handleIt(resp));
    // api.getStatus(resp => handleStatusResp(resp).bind(this));
  }

  handleIt(resp) {
    const active = (resp.code === 200) ? 'active' : 'off';
    this.setState({ active });
    api.getGraph({ pair: this.state.pair, tf: this.state.tf }, resp => {

      const str = JSON.stringify(resp.result, null, 2);

      this.setState({ graphData: str });

      getData().then(data => {
        console.log(data)
        this.setState({ data: data });
      })
    });
  }

  render() {
    return (
      <div>
        <pre> -{this.state.graphData}-</pre>
        <div> -{this.state.active}-</div>
      </div>
    );
  }
}

export default TF;
