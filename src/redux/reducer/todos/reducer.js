
import {
    GET_USER_TODO, EDIT_TODO,
    ADD_TODO, REMOVE_TODO, TOGGLE_TODO
} from './actionTypes';

const initialState = [];

export default function(state=initialState, action) {
    switch (action.type) {
        case GET_USER_TODO:
            return action.payload;
        case ADD_TODO:
            return [...state, action.payload];
        case EDIT_TODO:
            return state.map(todo => {
                if (todo.id === action.payload.id) {
                    return action.payload;
                } else {
                    return todo
                }
            });
        case REMOVE_TODO:
            return state.filter(todo => {
                return todo.id !== action.payload;
            });
        case TOGGLE_TODO:
            return state.map(todo => {
                if (todo.id === action.payload) {
                    return Object.assign({} , todo, {
                        is_complete: !todo.is_complete
                    });
                } else {
                    return todo;
                }
            });
        default:
            return state;
    };
};
