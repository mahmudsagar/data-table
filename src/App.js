import "./App.css";
import UserTable from './components/UserTable';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import LoginUser from "./components/UserAuthentication/Login";

function App() {
    
    return <div>
        <LoginUser />
        <UserTable />
    </div> 
}

export default App;
