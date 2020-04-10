import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signUp} from '../redux/reducer/user/actions';

export default function SignupPage() {
    const initialState = {
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        confirm_password: ''
    }
    const [form, setForm] = useState(initialState);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isSuccess) {
            history.push('/signin');
        }
    }, [isSuccess]);
    function handleChange(event) {
        setForm(Object.assign({}, form, {
            [event.target.name]: event.target.value
        }));
    };
    function handleSubmit(event) {
        event.preventDefault();
        if (form.first_name && form.last_name &&
                form.username && form.password &&
                form.confirm_password) {
            if (form.password === form.confirm_password) {
                dispatch(signUp(form.username, form.password, form.first_name, form.last_name, setError, setIsSuccess));
            } else {
                setError('Confirm Password not correct');
            }
        } else {
            setError('Please complete the form');
        }
    };
    return (
        <div className='sign-page'>
            <div className='left-page'>
                <p className='title'>
                    Sign Up Page
                </p>
            </div>
            <div className='right-page'>
                <form className='signup-form' onSubmit={(e) => handleSubmit(e)}>
                    {error
                        ? (<p className='error'>{error}</p>)
                        : (null)
                    }
                    <div className='wrap wrap-fullname'>
                        <label>
                            First Name
                            <input
                                name='first_name'
                                placeholder='First name'
                                value={form.first_name}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                        <label>
                            Last Name
                            <input
                                name='last_name'
                                placeholder='Last name'
                                value={form.last_name}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>
                    <div className='wrap wrap-username'>
                        <label>
                            Username
                            <input
                                name='username'
                                placeholder='Username'
                                value={form.username}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>
                    <div className='wrap wrap-password'>
                        <label>
                            Password
                            <input
                                name='password'
                                type='password'
                                placeholder='Password'
                                value={form.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>
                    <div className='wrap wrap-conform_password'>
                        <label>
                            Confirm Password
                            <input
                                name='confirm_password'
                                type='password'
                                placeholder='Confirm Password'
                                value={form.confirm_password}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>
                    <div className='form-button'>
                        <a href='/signin'>Sign In instead</a>
                        <button className='submit-button'>Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
