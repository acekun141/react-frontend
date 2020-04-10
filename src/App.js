import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from './redux/reducer/user/actions';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UserPage from './pages/UserPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';


export default function App() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser()); 
    }, []);

    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <PrivateRoute exact path='/'>
                        <UserPage />
                    </PrivateRoute>
                    <Route path='/signup'>
                        <SignupPage />
                    </Route>
                    <Route path='/signin'>
                        <SigninPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};
