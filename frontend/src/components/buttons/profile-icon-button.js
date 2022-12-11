import './icon-button.css';
import groupsIcon from '../images/profile_icon.png'
import { useNavigate } from 'react-router-dom';

function ProfileIconButton() {
    const navigate = useNavigate();

    const handleClick = function(){
        navigate('../profile');
    }

    return (
    <div className='iconButton' onClick={handleClick}>
        <img className='footer_icon' src={groupsIcon} alt='groupsIconButton'></img>
    </div>
    );
}
export default ProfileIconButton;