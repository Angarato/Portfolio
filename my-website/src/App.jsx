import Header from "./Header"
import UserGreeting from "./UserGreeting";

function App() {
    return(
    <>
    <Header/>
    <UserGreeting isLoggedIn={true} username="Angarato" />
    <UserGreeting isLoggedIn={true}/>
    </>
    );
}

export default App
