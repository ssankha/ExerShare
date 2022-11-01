import './BlankFooter.css';
import GroupsIconButton from '../buttons/groups-icon-button';
import ProfileIconButton from '../buttons/profile-icon-button';
import MainPageIconButton from '../buttons/main-page-icon-button';


function BlankFooter() {

    return (
        <div className="footerContainer">
            <GroupsIconButton></GroupsIconButton>
            <MainPageIconButton></MainPageIconButton>
            <ProfileIconButton></ProfileIconButton>
        </div>
    );
}
export default BlankFooter;