import {useState} from 'react';
import './create-post-page.css';
import {useNavigate} from 'react-router-dom';
import RoundedButton from '../components/buttons/rounded-button';
import { userEmail, userId } from '../index';

function CreatePostPage() {
    const contentPlaceholder = 
    `Category
        Exercise1, __lbs, __ sets x __ reps
        Exercise2, __lbs, __ sets x __ reps
        Exercise3, __lbs, __ sets x __ reps
Category
        Exercise1, __lbs, __ sets x __ reps
        Exercise2, __lbs, __ sets x __ reps
        Exercise3, __lbs, __ sets x __ reps`;
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        title: "",
        content: "",
    })
    const [checks, setChecks] = useState({check1: false, check2: false, check3: false});

    const handleTitleChange = (event) => {
        setInfo({...info, title: event.target.value});
    }

    const handleContentChange = (event) => {
        setInfo({...info, content: event.target.value});
    }

    const handlePostClicked = () => {
        async function check(){
            try{
                let status;
                await fetch('/api/post',{
                    method: 'POST',
                    body: JSON.stringify({
                      userId: userId,
                      title: info.title,
                      content: info.content,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => status = data.status);
                if(status === "success"){
                    navigate('../main');

                } else {
                    console.log("not signed in")
                    return;
                }
            } catch(e){

                //should only occur if server error, display appropriate message

                return;
            }
            
        }
        check();
        async function check2(){
            try{
                let status;
                await fetch('/api/addWorkout',{
                    method: 'POST',
                    body: JSON.stringify({
                      userId: userId,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => status = data.status);
                if(status === "success"){

                } else {
                    console.log("not signed in")
                    return;
                }
            } catch(e){

                //should only occur if server error, display appropriate message

                return;
            }
            
        }
        check2();
        async function check3(){
            try{
                let status;
                await fetch('/api/updateWorkoutGoals',{
                    method: 'POST',
                    body: JSON.stringify({
                      userId: userId,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => status = data.status);
                if(status === "success"){


                } else {
                    console.log("not signed in")
                    return;
                }
            } catch(e){

                //should only occur if server error, display appropriate message

                return;
            }
            
        }
        check3();
    }


    return (
        <div className='create_post_page_background'>
            <div className='create_post_page_container'>
                <div className='create_post_page_top_container'>
                    <div className='create_post_page_title_field'>
                        <input className='create_post_page_title_input' placeholder='TITLE' onChange={handleTitleChange}></input>
                    </div>
                    <div className='create_post_page_content_field'>
                        <textarea className='create_post_page_content_input' defaultValue={contentPlaceholder} onChange={handleContentChange}></textarea>
                    </div>
                </div>
                <div className='create_post_page_post_button'>
                    {RoundedButton('POST', handlePostClicked)}
                </div>
            </div>
        </div>
    );
}
export default CreatePostPage;