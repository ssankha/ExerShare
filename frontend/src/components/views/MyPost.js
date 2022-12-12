import './Post.css';

const MyPost = (id, title, author, content, likeCount) => {

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
            </div>
        </div>
    )
} 
export default MyPost;