import React from 'react';
import {BACKGROUND} from '../contants';

export default function UserBackground() {
    return (
        <div className='user-background'>
            <img
                src={BACKGROUND}
                alt='user-background'
            />
        </div>
    );
};
