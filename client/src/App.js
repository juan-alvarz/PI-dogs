import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/Home";

//renderiza la app con las rutas donde se renderizan y los componentes a renderizar
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
