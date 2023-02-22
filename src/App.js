
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";

import './App.css';
import Navbar from "./components/navbar/navbar"
import Login from "./components/auth/login";
import Registration from "./components/auth/registration";
import Task from "./components/task/task"

function App() {
    const UserReducer = useSelector((state => state.UserReducer))
  return (
    <div className="App">
      <BrowserRouter>
            <Navbar/>
          {!UserReducer.isAuth ?
              <Switch>
                  <Route exact={true} path={'/'} component={Login}/>
                  <Route exact={true} path={'/login'} component={Login}/>
                  <Route exact={true} path={'/registration'} component={Registration}/>
              </Switch> :
              <Switch>
                  <Route exact={true} path={''} component={Task}/>
              </Switch>
          }

      </BrowserRouter>
    </div>
  );
}

export default App;
