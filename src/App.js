import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Error404 from './components/Error404';



function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="*"><Error404/></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
