import React from 'react';

import {Router, Route, Switch, Redirect } from 'react-router-dom';
import * as UTILS from './utils';

import HomeScreen from './screens/Home'
//import MainScreen from './screens/Main'
import WordGlobScreen from './screens/WordGlob'
import history from './history';

/** Redux Begin */
import AuthActions from './store/actions/Auth';
import {connect} from 'react-redux';
import ResetPassword from './screens/ResetPassword';
import BrainStormHome from './screens/BrainStormHome';
import BrainStormStart from './screens/BrainStormStart';
import Review from './screens/Review';
import Profile from './screens/Profile';

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
                        <PrivateRoute authed={UTILS.checkJWTValidate()} exact path="/wordglob" component={WordGlobScreen} />
                        <PrivateRoute authed={UTILS.checkJWTValidate()} exact path="/brainstorm-home" component={BrainStormHome} />
                        <PrivateRoute authed={UTILS.checkJWTValidate()} exact path="/brainstorm-start" component={BrainStormStart} />
                        <PrivateRoute authed={UTILS.checkJWTValidate()} exact path="/review" component={Review}/>
                        <PrivateRoute authed={UTILS.checkJWTValidate()} exact path="/profile" component={Profile}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);