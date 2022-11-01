import './icon-button.css';
import mainPageIcon from '../images/main_page_icon.png'

function MainPageIconButton() {

    return (
    <div className='iconButton'>
        <img className='footer_icon' src={mainPageIcon} alt='mainPageIconButton'></img>
    </div>
    );
}
export default MainPageIconButton;