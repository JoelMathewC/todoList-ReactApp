import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Error404 from './components/Error404';
import TaskDetails from './components/TaskDetails';
import CreateTasks from './components/CreateTask';
import EditTasks from './components/EditTask';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route exact path="/tasks/:id"><TaskDetails/></Route>
            <Route exact path="/tasks/edit/:id"><EditTasks/></Route>
            <Route exact path="/create"><CreateTasks/></Route>
            <Route path="*"><Error404/></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
