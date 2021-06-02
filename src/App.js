import "./App.css";
import UserTable from "./components/UserTable";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginUser from "./components/UserAuthentication/Login";
import UserDashboard from "./components/UserDashboard";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <UserTable />
                </Route>
                <Route path="/users/:id">
                    <UserDashboard />
                </Route>
                <Route path="/login">
                    <LoginUser />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
