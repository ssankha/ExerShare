import './Post.css';
import likeIcon from '../images/like_icon_gold.png';
import commentIcon from '../images/comment_icon_gold.png';
import { useState } from 'react';

const Post = ({id, title, author, content, likeCount}) => {
    const [canLike, setCanLike] = useState(true);
    const [likeCountNum, setLikeCountNum] = useState(likeCount);

    const likePost = function(event){
        if(!canLike){
            return;
        }
        event.preventDefault();
        async function like(){
            try{
                let status;
                await fetch('/api/likePost',{
                    method: 'POST',
                    body: JSON.stringify({
                        post_id: id 
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => status = data.status);
                if(status === "success"){
                    setCanLike(false);
                    setLikeCountNum(++likeCount);
                } else {
                    return;
                }
            } catch(e){

                //possibly display error

                return;
            }
            
        }
        like();
    }

    return (
        <div className="post_container">
            <div className='post_header_container'>
                <div className='post_title'>
                    {title}
                </div>
                <div className='post_author'>
                    {author}
                </div>
            </div>
            <div className='post_body_container'>
                <pre className='post_content'>
                    {content}
                </pre>
                <div className='post_icons'>
                    {likeCountNum}
                    <img className='post_icon' src={likeIcon} alt='likeIcon' onClick={likePost}></img>
                </div>
            </div>
        </div>
    )
} 
export default Post;