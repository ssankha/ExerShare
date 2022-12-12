import './Group.css';

const Group = (groupId, groupName, handleClicked) => {

    return (
        <div className='group_container' onClick={() => handleClicked(groupId, groupName)}>
            <div className="group_name">{groupName}</div>
        </div>
    );
} 
export default Group;

