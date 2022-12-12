import './icon-button.css';
import mainPageIcon from '../images/main_page_icon.png'
import { useNavigate } from 'react-router-dom';

function MainPageIconButton() {
    const navigate = useNavigate();

    const handleClick = function(event){
        event.preventDefault();
        navigate('../main');
    }
    return (
    <div className='iconButton'>
        <img className='footer_icon' src={mainPageIcon} alt='mainPageIconButton' onClick={handleClick}></img>
    </div>
    );
}
export default MainPageIconButton;