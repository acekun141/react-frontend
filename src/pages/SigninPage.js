import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {signIn} from '../redux/reducer/user/actions';
import {useHistory} from 'react-router-dom';

export default function SigninPage() {
    const initialForm = {username: '', password:''}

    const [formError, setFormError] = useState('');
    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const history = useHistory();

    useEffect(() => {
        if (user.first_name) {
            history.push('/');
        }
    }, [user]);

    const clearForm = () => {
        setForm(initialForm);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.username, form.password) {
            dispatch(signIn(form.username, form.password, setFormError));
            clearForm();
        } else {
            setFormError('Please complete form');
        }
    };

    const handleChange = (event) => {
        setForm(Object.assign({}, form, {
            [event.target.name]: event.target.value
        }));
    };

    return (
        <div className='sign-page'>
            <div className='left-page'>
                <p className='title'>
                    Sign In Page
                </p>
            </div>
            <div className='right-page'>
                <form className='signup-form' onSubmit={(e) => handleSubmit(e)}>
                    {formError
                        ? (<p className='error'>{formError}</p>)
                        : (null)
                    }
                    <div className='wrap wrap-username'>
                        <label>
                            Username
                            <input
                                name='username'
                                placeholder='Username'
                                value={form.username}
                                onChange={(e) => handleChange(e)}
                                required
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
                                required
                            />
                        </label>
                    </div>
                    <div className='form-button'>
                        <a href='/signup'>Sign Up instead</a>
                        <button className='submit-button'>Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
