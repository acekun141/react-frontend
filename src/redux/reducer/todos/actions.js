import {
    GET_USER_TODO, EDIT_TODO,
    ADD_TODO, REMOVE_TODO, TOGGLE_TODO
} from './actionTypes';


export const  getUserTodo = (public_id) => async (dispatch) => {
    const response = await fetch('/todo/', {
        method: 'GET',
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    });

    const data = await response.json();

    if (data.todos) {
        return dispatch({
            type: GET_USER_TODO,
            payload: data.todos
        });
    } else {
        return null;
    }
}; 

export const addTodo = (name, content) => async (dispatch) => {
    const response = await fetch('/todo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({name: name, content: content})
    });
    const data = await response.json();
    if (data.message) {
        return dispatch({
            type: ADD_TODO,
            payload: data.todo
        })
    } else {
        return null;
    }
};

export const editTodo = (id, name, content) => async (dispatch) => {
    const response = await fetch(`/todo/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify({name: name, content: content})
    });
    const data = await response.json();
    if (data.message) {
        return dispatch({
            type: EDIT_TODO,
            payload: data.todo
        });
    } else {
        return null;
    }
};

export const deleteTodo = (id) => async (dispatch) => {
    const response = await fetch(`/todo/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
    });
    const data = await response.json();
    if (data.message) {
        return dispatch({
            type: REMOVE_TODO,
            payload: id
        });
    } else {
        return null;
    }
};

export const toggleTodo = (id) => async (dispatch) => {
    const response = await fetch(`/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        },
    });
    const data = await response.json();
    if (data.message) {
        return dispatch({
            type: TOGGLE_TODO,
            payload: id
        });
    } else {
        return null;
    }   
};
