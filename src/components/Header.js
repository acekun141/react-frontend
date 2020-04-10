import React, {useEffect, useState} from 'react';
import Avatar from './Avatar';
import {useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logOut} from '../redux/reducer/user/actions';

export default function Header() {
    const location = useLocation();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (location.pathname === '/signin' ||
                location.pathname === '/signup') {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [location]);
    const result = show
        ? (<div className='header'><Logo/><Nav/></div>)
        : null
    return (
        result
    );
};

function Logo() {
    return (
        <div className='logo'>
            <a href='/' className='logo-icon'>Todo</a>
        </div>
    );
};

function Nav() {
    const dispatch = useDispatch();
    const handleOut = () => {
        dispatch(logOut());
    }
    return (
        <ul className='nav'>
            <Search />
            <Avatar />
            <div className='button-logout'>
                <button
                    onClick={() => handleOut()}
                >
                    Log Out
                </button>
            </div>
        </ul>
    );
};

function Search(props) {
    return (
        <div className='search'>
            <input
                name='search'
                placeholder='Search'
            />
        </div>
    );
};
