import BlankHeader from "../components/views/BlankHeader";
import './join-group-page.css'
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import JoinGroupSubmitButton from "../components/buttons/join-group-submit-button";

function JoinGroupPage() {

    const [groupName, setGroupName] = useState("")
    const [groupPassword, setGroupPassword] = useState("");

    const [fieldEmpty, setFieldEmpty] = useState(false);
    

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    }

    const handleGroupPasswordChange = (event) => {
        setGroupPassword(event.target.value);
    }

    

    const navigate = useNavigate();

    const handleSubmit = () => {
        
        if(groupName === "" || groupPassword === "") {
            setFieldEmpty(true);
        }
        else {
            // add API call here to add the user to the group
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

                    <br></br>

                    <center>
                        <JoinGroupSubmitButton onClickFunction={handleSubmit}/>
                    </center>
                </div>

            </center>
        </div>
    );


} export default JoinGroupPage;