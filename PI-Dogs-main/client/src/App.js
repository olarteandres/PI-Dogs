import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateDogs from "./components/DogCreate";


function App() {
  return (
    <BrowserRouter>
    
    <div className="App">
      <Switch>
     <Route exact path= "/" component= {LandingPage}/>
     <Route path= "/home" component= {Home}/>
     <Route path= "/dogs" component= {CreateDogs}/>
      </Switch>
    </div>
    
    </BrowserRouter>
  );
}

export default App;
