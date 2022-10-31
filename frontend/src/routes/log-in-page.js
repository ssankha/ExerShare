import {useState} from 'react';
import './log-in-page.css';
import HomeScreenButton from '../components/buttons/home-screen-button';

function LogInPage() {
    const [info, setInfo] = useState({
        email: "",
        password: "",
    })

    const handleEmailChange = (event) => {
        setInfo({...info, email: event.target.value});
    }

    const handlePasswordChange = (event) => {
        setInfo({...info, password: event.target.value});
    }


    const handleSignInClicked = () => {
        return;
    }

    const handleRegisterClicked = () => {
        return;
    }

    return (
    <div className='log_in_page_container'>
        <div className='log_in_page_title'>
            ExerShare
        </div>
        <div className='log_in_page_field'>
            <text className='log_in_page_field_text'>EMAIL: </text><input className='log_in_page_input' onChange={handleEmailChange}></input>
        </div>
        <div className='log_in_page_field'>
            <text className='log_in_page_field_text'>PASSWORD: </text><input className='log_in_page_input' onChange={handlePasswordChange}></input>
        </div>
        <div className='log_in_page_new_user' onClick={handleRegisterClicked}>
            New user? Click <u>here to register</u>
        </div>
        <div className='log_in_page_sign_in_button'>
            {HomeScreenButton('SIGN IN', handleSignInClicked)}
        </div>
    </div>
    );
}
export default LogInPage;