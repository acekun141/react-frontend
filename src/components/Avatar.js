import React from 'react';
import {AVATAR} from '../contants';

export default function Avatar() {
    return (
        <div className='avatar'>
            <img
                src={AVATAR}
                alt='avatar'
            />
        </div>
    );
};
