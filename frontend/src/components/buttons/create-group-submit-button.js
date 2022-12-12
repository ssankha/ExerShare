import './create-group-submit-button.css';


const CreateGroupSubmitButton = ({onClickFunction}) => {

    return (
    <div className='create_group_submit_button' onClick={onClickFunction} >CREATE GROUP</div>
    );
}
export default CreateGroupSubmitButton;