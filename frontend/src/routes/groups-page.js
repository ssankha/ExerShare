import CreateGroupButton from '../components/buttons/create-group-button';
import JoinGroupButton from '../components/buttons/join-group-button';
import BlankFooter from '../components/views/BlankFooter';
import BlankHeader from '../components/views/BlankHeader';
import './groups-page.css';
import Post from '../components/views/Post';


function GroupsPage() {


    const demoId = 3;
    const demoTitle = "Arm Day";
    const demoAuthor = "@ben_zirkle";
    const demoContent =
        `Biceps
        Curls, 25lbs, 5sets x 10reps
Triceps
        Overhead Extension, 45lbs, 4sets x 8reps`;
    const demoLikeCount = 3;

    return (
        <div>
            <BlankHeader />

            <div className='groups_page_container'>

                <div className='break'></div>

                <div className='groups_page_menu_bar'>

                    <CreateGroupButton />

                    <div className='groups_dropdown'>
                        <div className='groups_dropbtn'>ALL POSTS</div>
                        <div class="groups_dropdown_content">
                            <div>Demo Group 1</div>
                            <div>Demo Group 2</div>
                        </div>
                    </div>



                    <JoinGroupButton />
                </div>

                <br></br>

                <center>
                    {Post(demoId, demoTitle, demoAuthor, demoContent, demoLikeCount)}
                </center>

            </div>



            <BlankFooter />
        </div>
    );
} export default GroupsPage;