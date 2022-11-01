import {useState} from 'react';
import './create-post-page.css';
import {useNavigate} from 'react-router-dom';
import RoundedButton from '../components/buttons/rounded-button';
import { userEmail } from '../index';

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
                      email: userEmail,
                      postTitle: info.title,
                      postContent: info.content,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => status = data.status);
                if(status === "success"){

                    //enter navigation change right here

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