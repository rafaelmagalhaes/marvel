import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./assets/style/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import HomePage from "./pages/home";
import CharacterPage from "./pages/character";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Nav />
          <main className="main-content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/character/:id" component={CharacterPage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
