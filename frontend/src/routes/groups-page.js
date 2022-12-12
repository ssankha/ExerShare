import CreateGroupButton from '../components/buttons/create-group-button';
import JoinGroupButton from '../components/buttons/join-group-button';
import BlankFooter from '../components/views/BlankFooter';
import BlankHeader from '../components/views/BlankHeader';
import './groups-page.css';
import Group from '../components/views/Group';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setUserEmail, setUserId, userEmail, userId } from '..';


function GroupsPage() {

    const [groups, setGroups] = useState([{groupID: 3, groupName: "Group1"}, {groupID: 12, groupName: "Group2"}, {groupID: 69, groupName: "Group3"}, {groupID: 39, groupName: "Group4"}, {groupID: 23, groupName: "Group5"}]);

    
    useEffect(() => {
        // get this user's groups given
        async function getGroups() {
            try {
                let res;
                await fetch('/api/getGroups',{
                    method: 'POST',
                    body: JSON.stringify({
                      user_id: userId,
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => res = data);

                if(res.status === "success"){
                   setGroups(res.groups);
                   console.log(groups);
                } else {
                    return;
                }
            } catch(e) {
                return;
            }
        }
        getGroups();
    }, []); 
    
    const navigate = useNavigate();
    const handleClicked = (groupId, groupName) => {
        navigate(`../groups/${groupId}/${groupName.replaceAll(' ', '%')}`);
    }

    return (
        <div>
            <BlankHeader />

            <div className='groups_page_container'>

                <div className='groups_break'></div>

                <div className='groups_page_menu_bar'>

                    <CreateGroupButton className="create_group_btn"/>

                    <div className='groups_title'>Your Groups</div>

                    <JoinGroupButton className="join_group_btn"/>
                </div>

                <br></br>

                <br></br>

                <center>
                    <br></br>
                    {groups.map((group) => {return Group(group.groupID, group.groupName, handleClicked)})}

                </center>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>


            </div>



            <BlankFooter />
        </div>
    );
} export default GroupsPage;