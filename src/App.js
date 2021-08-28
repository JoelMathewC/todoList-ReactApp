import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Error404 from './components/Error404';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
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
