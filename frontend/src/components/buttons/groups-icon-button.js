import './icon-button.css';
import groupsIcon from '../images/groups_icon.png'
import {useNavigate} from "react-router-dom";

function GroupsIconButton() {

    const navigate = useNavigate();

    const handleClicked = () => {
        navigate('../groups');
    }


    return (
    <div className='iconButton'>
        <img className='footer_icon' src={groupsIcon} alt='groupsIconButton' onClick={handleClicked}></img>
    </div>
    );
}
export default GroupsIconButton;