import './create-post-button.css';
import {useNavigate} from 'react-router-dom';

function CreatePostButton() {
    const navigate = useNavigate();

    const handleCreatePostClicked = () => {
        navigate('../create_post')
    }

    return (
    <div className='create_post_button' onClick={handleCreatePostClicked}> + CREATE POST + </div>
    );
}
export default CreatePostButton;