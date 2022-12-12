import { useState, useEffect } from 'react';
import BlankHeader from '../components/views/BlankHeader';
import './home-page.css'
import CreatePostButton from '../components/buttons/create-post-button';
import BlankFooter from '../components/views/BlankFooter';
import Post from '../components/views/Post';
import { setUserId, userId } from '..';


function HomePage() {
    //const navigate = useNavigate();
    setUserId(window.localStorage.getItem('userId'));


    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts(){
            try{
                await fetch('/api/getAllPosts',{
                    method: 'POST',
                    body: JSON.stringify({
                      userId: userId,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => {if(data.status === "success"){console.log(data.posts); setPosts(data.posts)}});
            } catch(e){

                //possibly display error

                return;
            }
        }
        getPosts();
    }, []);

    return (
        <div>
            <BlankHeader />
        
            <div className='main_page_container'>
                <div className='home_page_break'></div>
                <center>
                    <CreatePostButton />
                            {posts.map((post) => {return <Post id={post.postID} title={post.title} author={post.email} content={post.content} likeCount={post.likeCount}/>})}
                </center>
                <div className='home_page_big_break'></div>
            </div>

            <BlankFooter />
        </div>

    );
}
export default HomePage;