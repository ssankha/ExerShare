import {useState} from 'react';
import './home-screen-button.css';

function HomeScreenButton(text, clickFunction) {

    return (
    <div className='home_screen_button' onClick={clickFunction}>
        {text}
    </div>
    );
}
export default HomeScreenButton;