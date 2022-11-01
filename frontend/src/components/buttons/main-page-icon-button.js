import './icon-button.css';
import mainPageIcon from '../images/main_page_icon.png'

function MainPageIconButton() {

    return (
    <div className='IconButton'>
        <img src={mainPageIcon} alt='mainPageIconButton'></img>
    </div>
    );
}
export default MainPageIconButton;