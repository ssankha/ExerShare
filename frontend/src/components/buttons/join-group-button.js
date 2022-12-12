import {useNavigate} from 'react-router-dom';
import './join-group-button.css';

function JoinGroupButton() {
    const navigate = useNavigate();

    const handleJoinGroupClicked = () => {
        navigate('../join_group');
    }

    return (
    <div className='join_group_button' onClick={handleJoinGroupClicked}>JOIN</div>
    );
} export default JoinGroupButton;