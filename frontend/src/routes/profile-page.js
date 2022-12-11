import { useEffect, useState } from 'react';
import BlankHeader from '../components/views/BlankHeader';
import './profile-page.css'
import BlankFooter from '../components/views/BlankFooter';
import Post from '../components/views/Post';
import { setUserEmail, userEmail } from '..';


function ProfilePage() {
    //const navigate = useNavigate();
    const [slideValue, setSlideValue] = useState("goals");
    const [editing, setEditing] = useState(false);
    const [editableInfo, setEditableInfo] = useState({bio: "", pounds: ""});
    const [info, setInfo] = useState({numOfGoalsCompleted: 0});
    const [goals, setGoals] = useState([]);
    const [posts, setPosts] = useState([]);

    const demoGoals = ["Complete 20 Workouts", "Lose/Gain 5 pounds", "Complete 30 Workouts",
     "Lose/Gain 8 pounds", "Complete 40 Workouts", "Lose/Gain 10 pounds", 
     "Lose/Gain 8 pounds", "Complete 40 Workouts", "Lose/Gain 10 pounds"]

    const handleSlideSwitch = function(event){
        event.preventDefault();
        if(slideValue === "goals"){
            setSlideValue("posts");
        } else {
            setSlideValue("goals");
        }
    }

    const beginEdit = function(event){
        event.preventDefault();
        setEditing(true);
    }

    setUserEmail(window.localStorage.getItem('userEmail'));

    useEffect(() => {
        async function retrieve(){
            try{
                let res;
                await fetch('/api/getProfile',{
                    method: 'POST',
                    body: JSON.stringify({
                      email: userEmail,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => res = data);
                if(res.status === "success"){
                    setEditableInfo({bio: res.bio, pounds: res.pounds});
                    setInfo({...info, numOfGoalsCompleted: res.numOfGoalsCompleted});
                } else {
                    return;
                }
            } catch(e){

                //possibly display error

                return;
            }
        }
        retrieve();
        async function getGoals(){
            try{
                let res;
                await fetch('/api/getGoals',{
                    method: 'POST',
                    body: JSON.stringify({
                      email: userEmail,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => res = data);
                if(res.status === "success"){
                    setGoals(res.goals);
                } else {
                    return;
                }
            } catch(e){

                //possibly display error

                return;
            }
        }
        getGoals();
        async function getPosts(){
            try{
                let res;
                await fetch('/api/getMyPosts',{
                    method: 'POST',
                    body: JSON.stringify({
                      email: userEmail,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => res = data);
                if(res.status === "success"){
                    setPosts(res.posts);
                } else {
                    return;
                }
            } catch(e){

                //possibly display error

                return;
            }
        }
        getPosts();
    }, [])

    const submitEdits = function(event){
        event.preventDefault();
        async function check(){
            try{
                let status;
                await fetch('/api/editProfile',{
                    method: 'POST',
                    body: JSON.stringify({
                      email: userEmail,
                      bio: editableInfo.bio,
                      pounds: editableInfo.pounds
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => status = data.status);
                if(status === "success"){
                    setEditing(false);

                } else {
                    return;
                }
            } catch(e){

                //possibly display error

                return;
            }
            
        }
        check();
    }

    const handleBioChange = function(event){
        setEditableInfo({...editableInfo, bio: event.target.value});
    }

    const handlePoundsChange = function(event){
        setEditableInfo({...editableInfo, pounds: event.target.value});
    }

    return (
        <div>
            
        
            <div className='profile_page_background'>
                <BlankHeader />
                <div className='profile_page_container'>
                    <div className='profile_page_top_container'>
                        <div className='profile_page_top_blank'>

                        </div>
                        <div className='profile_page_top_text'>
                            <div className='profile_page_username'>
                                {userEmail}
                            </div>
                            {!editing ? 
                            <div className='profile_page_bio'>
                                {editableInfo.bio}
                            </div> :
                            <textarea className='profile_page_bio_input' defaultValue={editableInfo.bio} onChange={handleBioChange}></textarea>}
                            <div className='profile_page_pounds'>
                                Pounds Gained/Lost: {!editing ? editableInfo.pounds : <input className='profile_page_pounds_input' defaultValue={editableInfo.pounds} onChange={handlePoundsChange}></input>} lbs
                            </div>
                        </div>
                        <div className='profile_page_edit_container'>
                            {!editing ? 
                            <div className='profile_page_edit_text' onClick={beginEdit}>
                                EDIT
                            </div> :
                            <div className='profile_page_submit_text' onClick={submitEdits}>
                                SUBMIT
                            </div>}
                            
                        </div>
                    </div>
                    <div className='profile_page_bottom_container'>
                        
                            {slideValue === "goals" ? 
                            <div className='profile_page_slide_container'>
                                <div className='profile_page_slide_selected'>
                                    GOALS
                                </div>
                                <div className='profile_page_slide_deselected' onClick={handleSlideSwitch}>
                                    POSTS
                                </div>
                            </div> :
                            <div className='profile_page_slide_container'>
                                <div className='profile_page_slide_deselected' onClick={handleSlideSwitch}>
                                    GOALS
                                </div>
                                <div className='profile_page_slide_selected'>
                                    POSTS
                                </div>
                            </div>}
                        
                        
                            {slideValue === "goals" ?
                            <div className='profile_page_goals_posts'>
                                <div className='profile_page_completed_container'>
                                    {info.numOfGoalsCompleted} Goals Completed
                                </div>
                                <div className='profile_page_divider'>

                                </div>
                                <div className='profile_page_goals_list'>
                                    {goals.map((goal) => {return <div className='profile_page_indiv_goal'><div className='profile_page_goal_title'>{goal}</div></div>})}
                                </div>
                            </div> :
                            <div className='profile_page_goals_posts'>
                                <div className='profile_page_posts_list'>
                                    {posts.map((post) => {return Post(post.title, post.author, post.content, post.likeCount)})}
                                </div>
                            </div>}
                        
                    </div>
                </div>
                <BlankFooter />
            </div>

            
        </div>

    );
}
export default ProfilePage;