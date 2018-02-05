import React from "react";
import * as api from "./api"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'
// export default function () {
//     console.log('it works');
// }

const TF = (props) => {
    // this.props.match.params.
    console.log(props.match.params.tf);
    // console . log(arguments);
    return (
        <p>.. TFG{props.match.params.tf} ..</p>
    )
}


class Graph extends React.Component {

    // constructor(props) {
    //     super(props)
    //     console.log(this.props)
    // }
    componentDidMount(){
        // alert('hi');
        api.getStatus(resp => {console.log(resp)})
    }

    render() {

        return (
            <div>
                <ul>
                    <li><Link to={`${this.props.match.url}/1m`}>1m</Link></li>
                    <li><Link to={`${this.props.match.url}/5m`}>5m</Link></li>
                    <li><Link to={`${this.props.match.url}/15m`}>15m</Link></li>
                </ul>

                <hr/>

                <Route exact path={this.props.match.url} render={() => (
                    <h3>Please select a time frame.</h3>
                )}/>
                <Route path={`${this.props.match.url}/:tf`} component={TF}/>
            </div>
        )
    }
}

export default Graph
