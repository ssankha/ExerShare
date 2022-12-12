import {useNavigate} from 'react-router-dom';
import './create-group-button.css';

function CreateGroupButton() {
    const navigate = useNavigate();

    const handleCreateGroupClicked = () => {
        navigate('../create_group');
    }

    return (
    <div className='create_group_button' onClick={handleCreateGroupClicked}>NEW</div>
    );
} export default CreateGroupButton;