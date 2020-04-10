import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AVATAR from '../components/Avatar';
import BACKGROUND from '../components/UserBackground';
import {signIn} from '../redux/reducer/user/actions';
import {
    getUserTodo, addTodo,
    editTodo, deleteTodo,
    toggleTodo
} from '../redux/reducer/todos/actions';


export default function UserPage() {
    const initialForm = {name: "", content: ""};
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(initialForm);
    const user = useSelector(state => state.user);

    function addTodo() {
        setShowForm(true);
    };
    function clearForm() {
        setForm(initialForm);
    };
    function openForm(todo) {
        setForm(todo);
        setShowForm(true);
    };
    function closeForm() {
        setShowForm(false);
        clearForm();
    };
    function onChangeForm(event) {
        setForm(Object.assign({}, form, {
            [event.target.name]: event.target.value
        }));
    };
    return (
        <div className='page-user'>
            <div className='page-header'>
                <BACKGROUND />
                <div className='user-info'>
                    <AVATAR />
                    <p className='user-name'>{`${user.first_name} ${user.last_name}`}</p>
                    <p className='user-second-name'>Loading...</p>
                </div>
            </div>
            <PageContent addTodo={addTodo} openForm={openForm} />
            {showForm
                ? (<TodoForm 
                        close={closeForm}
                        onChange={onChangeForm}
                        form={form}
                />)
                : null
            }
            
        </div>
    );
};

export function PageContent(props) {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const user = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getUserTodo(user.public_id));
    }, []);

    return (
        <div className='page-content'>
            <button 
                className='add-new'
                onClick={() => props.addTodo()}
            >
                Add New
            </button>
            {todos.map(todo => {
                return (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        openForm={props.openForm}
                    />
                )
            })}
        </div>
    );
};

export function Todo(props) {
    const dispatch = useDispatch();
    function handleToggle() {
        if (props.todo.id) {
            dispatch(toggleTodo(props.todo.id));
        }
    }
    return (
        <div className={`todo ${props.todo.is_complete}`}>
            <p className='name'>{props.todo.name}</p>
            <div className='todo-button'>
                <button
                    className={`is_complete ${props.todo.is_complete}`}
                    onClick={() => handleToggle()}
                >
                    {props.todo.is_complete
                        ? 'Complete'
                        : 'Uncomplete'
                    }
                </button>
                <button
                    className='show'
                    onClick={() => props.openForm(props.todo)}
                >
                    View
                </button>
            </div>
        </div>
    );
};

export function TodoForm(props) {
    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        if (props.form.name) {
            if (props.form.id) {
                dispatch(editTodo(props.form.id, props.form.name, props.form.content));
                props.close();
            } else {
                dispatch(addTodo(props.form.name, props.form.content));
                props.close();
            }
        } else {
            alert('Name must not null');
        }
    };
    function handleDelete() {
        if (props.form.id) {
            dispatch(deleteTodo(props.form.id));
        } 
        props.close();
    };

    function handleToggle() {
        if (props.form.id) {
            dispatch(toggleTodo(props.form.id));
        }
    }
    return (
        <div className='todo-form'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='form-header'>
                    <button
                        className={`is_complete ${props.form.is_complete}`}
                        onClick={() => handleToggle()}
                    >
                        {props.form.is_complete
                            ? 'Complete'
                            : 'Uncomplete'
                        }
                    </button>
                    <button 
                        className='close'
                        onClick={() => props.close()}
                    >
                        X
                    </button>
                </div>
                <div className='form-content'>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        onChange={(e) => props.onChange(e)}
                        value={props.form.name}
                    />
                    <textarea
                        type='text'
                        name='content'
                        placeholder='Content'
                        onChange={(e) => props.onChange(e)}
                        value={props.form.content}
                    />
                </div>
                <div className='form-button'>
                    {props.form.id
                            ? (<button
                                className='delete'
                                onClick={() => handleDelete()}
                                >Delete</button>)
                            : (null)
                    }
                    <button
                        className='submit'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
