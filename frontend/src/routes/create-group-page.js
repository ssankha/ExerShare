import BlankHeader from "../components/views/BlankHeader";
import './create-group-page.css'
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import CreateGroupSubmitButton from "../components/buttons/create-group-submit-button";

function CreateGroupPage() {

    const [groupName, setGroupName] = useState("")
    const [groupPassword, setGroupPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleSubmit = () => {
        if(groupPassword !== confirmPassword) {
            setFieldEmpty(false);
            setPasswordMismatch(true);
        }
        else if(groupPassword === "" || groupName === "" || confirmPassword === "") {
            setPasswordMismatch(false);
            setFieldEmpty(true);
        }
        else {
            // add API call to insert new row in groups table and group members
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