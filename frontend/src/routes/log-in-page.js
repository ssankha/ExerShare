import {useState} from 'react';
import './log-in-page.css';
import HomeScreenButton from '../components/buttons/home-screen-button';
import {userEmail, setUserEmail} from '../index';
import {useNavigate} from 'react-router-dom';

function LogInPage() {
    const navigate = useNavigate();
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
        async function check(){
            try{
                let status;
                await fetch('/api/signIn',{
                    method: 'POST',
                    body: JSON.stringify({
                      email: info.email,
                      password: info.password
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => status = data.status);
                if(status === "success"){
                    setUserEmail(info.email);

                    //enter navigation change right here

                } else {
                    return;
                }
            } catch(e){

                //possibly trigger UI error message for incorrect email+password here

                return;
            }
            
        }
        check();
    }

    const handleRegisterClicked = () => {

        navigate('../registration');

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
            <text className='log_in_page_field_text'>PASSWORD: </text><input type='password' className='log_in_page_input' onChange={handlePasswordChange}></input>
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