import "./App.css";
import UserTable from "./components/UserTable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginUser from "./components/UserAuthentication/Login";
import UserDashboard from "./components/UserDashboard";
import TopNavigation from './components/Navigation/TopNavigation/index';

function App() {
    return (
        <Router>
            <TopNavigation />
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
