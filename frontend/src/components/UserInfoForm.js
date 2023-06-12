function UserInfoForm(props){
    function onSubmit(event){
        event.preventDefault();
        // check if input is valid or not
        if (event.target.username.value === '' || event.target.password.value === '') {
            alert('username and password cannot be empty')
            return;
        }
        
        props.onSubmit(event)
    }


    return (
        <div className= 'form-outline'>
            <form className= 'registration' onSubmit = {onSubmit}>
                <div className= 'mb-3'>
                    <h1 className = 'form-text'>{props.title}</h1>
                    <div className="form-input mb-4">
                        <input type="text" className="form-control" name = 'username' placeholder="Username"/>
                    </div>

                    <div className="form-input mb-4">
                        <input type="password" className="form-control" name = 'password' placeholder="Password"/>
                    </div>
                </div>
                <button className="btn btn-block btn-primary submit-btn mb-4">{props.buttonName}</button>
            </form>
        </div>
    );
}
export default UserInfoForm;
