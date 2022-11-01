import './icon-button.css';
import groupsIcon from '../images/groups_icon.png'

function GroupsIconButton() {

    return (
    <div className='iconButton'>
        <img className='footer_icon' src={groupsIcon} alt='groupsIconButton'></img>
    </div>
    );
}
export default GroupsIconButton;