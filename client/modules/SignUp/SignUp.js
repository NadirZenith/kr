import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';

// Import Components
import Helmet from 'react-helmet';
import Header from '../App/components/Header/Header';
import Footer from '../App/components/Footer/Footer';

export class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email:    '',
                username: '',
                password: '',
                passwordCheck: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        // if (name === 'passwordCheck'){
        //     return
        // }
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
// alert('handle submit')
//         return
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
            userService.register(user).then(user => alert('ok')).error(user => alert('error'))
        }
    }

  clickAlert = () => alert('alert')

    render() {

        const { registering  } = this.props;
        const { user, submitted } = this.state;

        return (
            <div>
                <Helmet
                    title="MERN Starter - Blog App"
                    titleTemplate="%s - Blog App"
                    meta={[
                        { charset: 'utf-8' },
                        {
                            'http-equiv': 'X-UA-Compatible',
                            content: 'IE=edge',
                        },
                        {
                            name: 'viewport',
                            content: 'width=device-width, initial-scale=1',
                        },
                    ]}
                />
                <Header
                    onClickAlert={this.clickAlert}
                />
                <div className="styles.container">
                    <Link to="/">Home</Link>{' '}
                    <Link to={{pathname: '/login'}}>LogIn</Link>{' '}

                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                            <label htmlFor="firstName">Email</label>
                            <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                            {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.passwordCheck ? ' has-error' : '')}>
                            <label htmlFor="password">Password Check</label>
                            <input type="password" className="form-control" name="passwordCheck" value={user.passwordCheck} onChange={this.handleChange} />
                            {submitted && !user.passwordCheck &&
                            <div className="help-block">Passwords must match</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>
                            {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
// };


export default SignUp;
