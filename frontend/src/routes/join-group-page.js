import BlankHeader from "../components/views/BlankHeader";
import './join-group-page.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import JoinGroupSubmitButton from "../components/buttons/join-group-submit-button";
import { setUserEmail, setUserId, userEmail, userId } from '..';

function JoinGroupPage() {
    setUserId(window.localStorage.getItem('userId'));

    const [groupName, setGroupName] = useState("")
    const [groupPassword, setGroupPassword] = useState("");
    
    let groupId;

    const [fieldEmpty, setFieldEmpty] = useState(false);
    const [falseInfo, setFalseInfo] = useState(false);


    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    }

    const handleGroupPasswordChange = (event) => {
        setGroupPassword(event.target.value);
    }

    const navigate = useNavigate();

    const handleSubmit = async () => {

        if (groupName === "" || groupPassword === "") {
            setFieldEmpty(true);
            setFalseInfo(false);
        }
        else {
            // check if group credentials are correct
            try {
                let res;
                await fetch('/api/getGroupId',{
                    method: 'POST',
                    body: JSON.stringify({
                      group_name: groupName,
                      group_password: groupPassword
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => res = data);
                
                console.log(res);
                if(res.status === "success") {
                    groupId = res.group_id;
                    console.log(groupId);
                }
                
            } catch(e) {
                return;
            } 


            // insert row into Groups_Members
            try {
                let res;
                await fetch('/api/joinGroup',{
                    method: 'POST',
                    body: JSON.stringify({
                      group_id: groupId,
                      user_id: userId
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => res = data);

                if(res.status === "success"){
                    console.log(userId);
                } else {
                    return;
                }
            } catch(e) {
                return;
            } 
            
            navigate('../groups');
            

            
        }

    }

    return (
        <div>
            <BlankHeader />

            <center>
                <div className="join_group_container">

                    <div className="join_group_break"></div>

                    <div className="group_field_container">
                        <div className="group_label">GROUP NAME: </div>
                        <input className="group_input" type="text" onChange={handleGroupNameChange}></input>
                    </div>

                    <div className="group_field_container">
                        <div className="group_label">GROUP PASSWORD: </div>
                        <input className="group_input" type="password" onChange={handleGroupPasswordChange}></input>
                    </div>

                    {fieldEmpty ?
                        <div className="groups_error_message">Error: Cannot submit with blank fields!</div> : null}
                    
                    {falseInfo ?
                        <div className="groups_error_message">Error: The group name or group password is incorrect!</div> : null}

                    <br></br>

                    <center>
                        <JoinGroupSubmitButton onClickFunction={handleSubmit} />
                    </center>
                </div>

            </center>
        </div>
    );


} export default JoinGroupPage;