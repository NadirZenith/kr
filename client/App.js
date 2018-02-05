import React from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'
import TodoApp from "./modules/TodoApp/TodoApp"
import Calculator from "modules/Calculator/Calculator"
import Graph from "modules/Graph"
// import Dev from "./Dev";

const Home = () => {
    return (
        <p>Hello, navigate through routes</p>
    )
}

const NoMatch = () => {
    return (
        <p>.. Not found ..</p>
    )
}


const PrivateRoute = ({component: Component, authed, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}

class App extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/calc'>Calc</Link></li>
                        <li><Link to='/graph'>Graph</Link></li>
                        <li><Link to='/todo'>Todo</Link></li>
                    </ul>

                    <hr/>

                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' render={ () => <div>Login</div>}/>
                        <Route path='/calc' render={rProps => <Calculator {...this.props.calc} />}/>
                        <Route path='/graph' render={rProps => <Graph {...rProps}  />} />

                        {/*<Route path='/todo' render={rProps => <TodoApp {...this.props.todo} />}/>*/}
                        <PrivateRoute authed={true} path='/todo' component={TodoApp}/>

                        <Route component={NoMatch}/>
                        {/*{!this.props.debug ? null : <Dev/>}*/}
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
