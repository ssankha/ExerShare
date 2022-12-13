import BlankHeader from "../components/views/BlankHeader";
import './create-group-page.css'
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import CreateGroupSubmitButton from "../components/buttons/create-group-submit-button";
import { setUserEmail, setUserId, userEmail, userId } from '..';

function CreateGroupPage() {
    setUserId(window.localStorage.getItem('userId'));

    const [groupName, setGroupName] = useState("")
    const [groupPassword, setGroupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let groupId;

    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [fieldEmpty, setFieldEmpty] = useState(false);

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    }

    const handleGroupPasswordChange = (event) => {
        setGroupPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const navigate = useNavigate();

    

    const handleSubmit = async () => {
        if(groupPassword !== confirmPassword) {
            setFieldEmpty(false);
            setPasswordMismatch(true);
        }
        else if(groupPassword === "" || groupName === "" || confirmPassword === "") {
            setPasswordMismatch(false);
            setFieldEmpty(true);
        }
        else {
            // inserting new row into User_Groups
            try {
                let res;
                await fetch('/api/createGroup',{
                    method: 'POST',
                    body: JSON.stringify({
                      group_name: groupName,
                      group_password: groupPassword
                    }),
                    headers: {"Content-Type": "application/json"}
                  }).then(response => response.json())
                  .then(data => res = data);

                if(res.status === "success"){
                    console.log(res);
                } else {
                    return;
                }
            } catch(e) {
                return;
            }

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
                <div className="create_group_container">

                    <div className="create_group_break"></div>

                    <div className="group_field_container">
                        <div className="group_label">GROUP NAME: </div>
                        <input className="group_input" type="text" onChange={handleGroupNameChange}></input>
                    </div>

                    <div className="group_field_container">
                        <div className="group_label">GROUP PASSWORD: </div>
                        <input className="group_input" type="password" onChange={handleGroupPasswordChange}></input>
                    </div>

                    <div className="group_field_container">
                        <div className="group_label">CONFIRM PASSWORD: </div>
                        <input className="group_input" type="password" onChange={handleConfirmPasswordChange}></input>
                    </div>
                    {passwordMismatch ? 
                    <div className="groups_error_message">Error: Passwords do not match!</div> : null}
                    
                    {fieldEmpty ? 
                    <div className="groups_error_message">Error: Cannot submit with blank fields!</div> : null}

                    <br></br>

                    <center>
                        <CreateGroupSubmitButton onClickFunction={handleSubmit}/>
                    </center>
                </div>

            </center>
        </div>
    );


} export default CreateGroupPage;