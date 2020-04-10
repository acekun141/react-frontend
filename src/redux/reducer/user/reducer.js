import {AUTHENTICATED, LOG_OUT, GET_USER} from './actionTypes';

const initialState = {};

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_USER:
            const token = localStorage.getItem('token', null);
            if (token) {
                try {
                    const get_user_token = token.split('.')[1];
                    const get_user_data = JSON.parse(atob(get_user_token));
                    return get_user_data;
                } catch(error) {
                    return initialState;
                }
            } else {
                return initialState;
            }
        case AUTHENTICATED:
            localStorage.setItem('token', action.payload);
            const user_token = action.payload.split('.')[1];
            const user_data = JSON.parse(atob(user_token));
            return user_data;
        case LOG_OUT:
            localStorage.clear();
            return initialState;
        default:
            return state;
    }
    return state;
};
