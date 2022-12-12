import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import BlankHeader from "../components/views/BlankHeader";
import "./group-post-page.css";
import Post from '../components/views/Post';
import BlankFooter from "../components/views/BlankFooter";

function GroupPostsPage() {

    const demoId = 3;
    const demoTitle = "Arm Day";
    const demoAuthor = "@ben_zirkle";
    const demoContent =
        `Biceps
        Curls, 25lbs, 5sets x 10reps
Triceps
        Overhead Extension, 45lbs, 4sets x 8reps`;
    const demoLikeCount = 3;

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
                    {Post(demoId, demoTitle, demoAuthor, demoContent, demoLikeCount)}
                    {Post(demoId, demoTitle, demoAuthor, demoContent, demoLikeCount)}
                    {Post(demoId, demoTitle, demoAuthor, demoContent, demoLikeCount)}
                    {posts.map((post) => { return Post(post.postID, post.title, post.email, post.content, post.likeCount) })}
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