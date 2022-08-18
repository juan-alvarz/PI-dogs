import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/Home";
import DetailCard from "./components/DetailCard";
import CreateDog from "./components/CreateDog";
import NotFoundPage from "./components/notFoundPage";

//renderiza la app con las rutas donde se renderizan y los componentes a renderizar
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route path="/createDog" component={CreateDog} />
          <Route path="/detail/:id" component={DetailCard} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
