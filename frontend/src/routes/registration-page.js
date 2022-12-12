import {useState} from 'react';
import './registration-page.css';
import HomeScreenButton from '../components/buttons/home-screen-button';
import {userEmail, setUserEmail} from '../index';
import {useNavigate} from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleEmailChange = (event) => {
        setInfo({...info, email: event.target.value});
    }

    const handlePasswordChange = (event) => {
        setInfo({...info, password: event.target.value});
    }

    const handleConfirmPasswordChange = (event) => {
        setInfo({...info, confirmPassword: event.target.value});
    }


    const handleRegisterClicked = () => {
        if(info.password !== info.confirmPassword){
            return;
        }

        //possibly add restrictions to email and password strings

        async function check(){
            try{
                let status;
                await fetch('/api/register',{
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
                    navigate('../');

                } else {
                    return;
                }
            } catch(e){

                //possibly trigger UI error message for email already existing

                return;
            }
            
        }
        check();
    }

    const handleSignInClicked = () => {

        navigate('/');

        return;
    }

    return (
    <div className='registration_page_container'>
        <div className='registration_page_title'>
            ExerShare
        </div>
        <div className='registration_page_field'>
            <text className='registration_page_field_text'>EMAIL: </text><input className='registration_page_input' onChange={handleEmailChange}></input>
        </div>
        <div className='registration_page_field'>
            <text className='registration_page_field_text'>PASSWORD: </text><input type='password' className='registration_page_input' onChange={handlePasswordChange}></input>
        </div>
        <div className='registration_page_field'>
            <text className='registration_page_field_text'>CONFIRM PASSWORD: </text><input type='password' className='registration_page_input' onChange={handleConfirmPasswordChange}></input>
        </div>
        <div className='registration_page_new_user' onClick={handleSignInClicked}>
            Already a user? Click <u>here to sign in</u>
        </div>
        <div className='registration_page_sign_in_button'>
            {HomeScreenButton('REGISTER', handleRegisterClicked)}
        </div>
    </div>
    );
}
export default RegistrationPage;