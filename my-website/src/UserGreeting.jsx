
function UserGreeting({username="Guest", isLoggedIn=false}){

    const welcome = <h2 className="welcome">Welcome {username}</h2>
    const loginPrompt = <h2 className="login-prompt">Please log in!</h2>
    

    return(isLoggedIn ? welcome : loginPrompt)
}



export default UserGreeting