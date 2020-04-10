import {AUTHENTICATED, LOG_OUT, GET_USER} from './actionTypes';


export const signIn = (username, password, setError) => async (dispatch) => {
    try {
        const response = await fetch('/auth/', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`
            }
        });
        if (response.status >= 500) {
            throw('Server not working. Try later');
        } else {
            const data = await response.json();
            if (data.error) {
                throw(data.error);
            } else {
                return dispatch({
                    type: AUTHENTICATED,
                    payload: data.token 
                })
            }
        }
    } catch(error) {
        setError(error);
    }
};

export const signUp = (username, password, first_name, last_name, setError, setIsSuccess) => async (dispatch) => {
    const response = await fetch('/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name
        })
    });
    const data = await response.json();
    if (data.message) {
        setIsSuccess(true);
    } else if (data.error) {
        setError(data.error);
    }
};

export const logOut = () => async (dispatch) => {
    return dispatch({
        type: LOG_OUT,
    });
};

export const getUser = () => (dispatch) => {
    return dispatch({
        type: GET_USER,
    });
}
