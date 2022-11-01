import { useState } from 'react';
import BlankHeader from '../components/views/BlankHeader';
import './home-page.css'
import CreatePostButton from '../components/buttons/create-post-button';
import BlankFooter from '../components/views/BlankFooter';
import Post from '../components/views/Post';


function HomePage() {
    //const navigate = useNavigate();
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
        
            <div className='main_page_container'>
                <div className='break'></div>
                <center>
                <CreatePostButton />
                {Post(demoTitle, demoAuthor, demoContent, demoLikeCount)}
                </center>
            </div>

            <BlankFooter />
        </div>

    );
}
export default HomePage;