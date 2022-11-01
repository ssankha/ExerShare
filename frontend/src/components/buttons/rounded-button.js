import './rounded-button.css';

function RoundedButton(text, clickFunction) {

    return (
    <div className='rounded_button' onClick={clickFunction}>
        {text}
    </div>
    );
}
export default RoundedButton;