import { useState } from 'react';
import BlankHeader from '../components/views/BlankHeader';
import './home-page.css'
import CreatePostButton from '../components/buttons/create-post-button';
import BlankFooter from '../components/views/BlankFooter';


function HomePage() {
    //const navigate = useNavigate();

    return (
        <div>
            <BlankHeader></BlankHeader>
        
            <div className='main_page_container'>
                <div className='break'></div>
                <center>
                <CreatePostButton></CreatePostButton>
                </center>
            </div>

            <BlankFooter></BlankFooter>
        </div>

    );
}
export default HomePage;