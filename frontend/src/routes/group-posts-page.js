import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BlankHeader from "../components/views/BlankHeader";
import "./group-post-page.css";
import Post from '../components/views/Post';
import BlankFooter from "../components/views/BlankFooter";

function GroupPostsPage() {
    const params = useParams();
    const groupId = parseInt(params.groupId);
    const groupName = params.groupName.replaceAll('%', ' ');

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // get this user's groups given the userId
        async function getGroupPosts() {
            try {
                let res;
                await fetch('/api/getGroupPosts', {
                    method: 'POST',
                    body: JSON.stringify({
                        group_id: groupId
                    }),
                    headers: { "Content-Type": "application/json" }
                }).then(response => response.json())
                    .then(data => res = data);

                if (res.status === "success") {
                    setPosts(res.posts);
                    console.log(posts);
                } else {
                    return;
                }
            } catch (e) {
                return;
            }
        }
        getGroupPosts();
    }, []);

    return (
        <div>
            <BlankHeader />

            <div className="group_posts_container">
                <div className='group_posts_title'>Posts from {groupName}</div>

                <br></br>
                <center>
                    
                    {posts.map((post) => { return <Post id={post.postID} title={post.title} author={post.email} content={post.content} likeCount={post.likeCount}/>})}
                </center>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

            </div>

            <BlankFooter/>
        </div>
    );
}
export default GroupPostsPage;