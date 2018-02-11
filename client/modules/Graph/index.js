import React from 'react';
import { Route, Link } from 'react-router-dom';
import { timeFormat, timeParse } from "d3-time-format";
// import Chart from './OHLCChartWithElderImpulseIndicator';
// import Chart from './CandleStickChartWithHoverTooltip';
// import Chart from './CandleStickChart';
// import Chart from './CandleStickChartForDiscontinuousIntraDay';
import Chart from './CandleStickChartForContinuousIntraDay';
// import Chart from './CandleStickChartDark';
import * as api from './api';

// const parseDate = timeParse("%Q");

function parseData(data) {
  const final = [];
  data.forEach((row) => {
    const date = new Date(row[0] * 1000);
    const d = {};
    d.date = date;
    d.open = +row[1];
    d.high = +row[2];
    d.low = +row[3];
    d.close = +row[4];
    d.volume = +row[6];

    final.push(d);
  });

  // console.log('------>', final);
  return final;
}

class Graph extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props);

    this.state = {
      type: 'svg',
      data: [],
      graphData: '',
      active: 'no',
      pair: 'XETHZEUR',
      interval: '1', // 1 (default), 5, 15, 30, 60, 240, 1440, 10080, 21600
    };
  }

  componentDidMount() {
    // alert('hi');
    api.getStatus(resp => this.handleStatusResp(resp));
    // api.getStatus(resp => handleStatusResp(resp).bind(this));
  }

  handleStatusResp(resp) {
    const active = (resp.code === 200) ? 'active' : 'off';
    this.setState({ active });

    api.getGraph({ pair: this.state.pair, interval: this.state.interval }, resp => this.handleChartResp(resp));
  }

  handleChartResp(resp) {
    const str = JSON.stringify(resp.result, null, 2);
    this.setState({ graphData: str });

    const result = resp.result[this.state.pair];
    // console.log(result);

    const data = parseData(result);

    this.setState({ data });
  }

  changeTf = (e) => {
    e.preventDefault();
    // alert(this.props.match);
    console.log(this.props.match);
  }

  render() {
    let ChartVar = null;
    if (this.state.data.length > 0) {
      ChartVar = <Chart type={this.state.type} data={this.state.data}/>;
    }


    return (
      <div>
        <ul>
          <li><Link to={`${this.props.match.url}/1m`} onClick={this.changeTf}>1m</Link></li>
          <li><Link to={`${this.props.match.url}/5m`} onClick={this.changeTf}>5m</Link></li>
          <li><Link to={`${this.props.match.url}/15m`} onClick={this.changeTf}>15m</Link></li>
        </ul>

        <hr/>

        <Route
          exact
          path={this.props.match.url}
          render={() => (
            <h3>Please select a time frame.</h3>
          )}
        />
        <div> -{this.state.active}-</div>
        {ChartVar}
        <pre> -{this.state.graphData}-</pre>
      </div>
    );
  }
}

// Graph.defaultProps = {
//   cityList: [],
//   provinceList: [],
// };

export default Graph;
