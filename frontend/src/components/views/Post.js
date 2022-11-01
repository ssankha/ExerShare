import './Post.css';
import likeIcon from '../images/like_icon_gold.png';
import commentIcon from '../images/comment_icon_gold.png';

const Post = (title, author, content, likeCount) => {

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
                    {likeCount}
                    <img className='post_icon' src={likeIcon} alt='likeIcon'></img>
                    <img className='post_icon' src={commentIcon} alt='commentIcon'></img>
                </div>
            </div>
        </div>
    )
} 
export default Post;