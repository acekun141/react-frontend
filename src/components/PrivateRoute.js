import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';


export default function PrivateRoute({children, ...rest}) {
    const user = useSelector(state => state.user);
    return (
        <Route {...rest}>
            {user.first_name
                ? (children)
                : (<Redirect to='/signin'/>)
            }
        </Route>
    );
};
