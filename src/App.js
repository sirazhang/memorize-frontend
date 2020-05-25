import React from 'react';

import {Router, Route, Switch, Redirect } from 'react-router-dom';

import HomeScreen from './screens/Home'
//import MainScreen from './screens/Main'
import WordGlobScreen from './screens/WordGlob'
import history from './history';

/** Redux Begin */
import AuthActions from './store/actions/Auth';
import {connect} from 'react-redux';
import ResetPassword from './screens/ResetPassword';

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        login: (username, password) => dispatch(AuthActions.Login(username, password))
    }
}
/** Redux End */

const PrivateRoute = ({component: Component, authed, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
        />
    )
}

class App extends React.Component{

    render(){
        return( 
            <div>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={HomeScreen} />
                        <Route exact path="/reset-password" component={ResetPassword} />
                        {/* <Route exact path="/" component={MainScreen} /> */}
                        <PrivateRoute authed={localStorage.getItem("user-memorize-token") != null} exact path="/wordglob" component={WordGlobScreen} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);