import './icon-button.css';
import groupsIcon from '../images/profile_icon.png'

function ProfileIconButton() {

    return (
    <div className='iconButton'>
        <img className='footer_icon' src={groupsIcon} alt='groupsIconButton'></img>
    </div>
    );
}
export default ProfileIconButton;