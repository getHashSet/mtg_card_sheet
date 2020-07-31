import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import DeckBuilder from "./pages/DeckBuilder/DeckBuilder";

function App() {
  return (
    <div className="App app_root">
      <Switch>
        <Route exact path="/" render={() => <Home />} />

        <Route exact path="/builder" render={() => <DeckBuilder />} />

        {/* DO NOT ADD CODE BELOW THIS LINE */}
        <Route render={() => <Error />} />
      </Switch>
    </div>
  );
}

export default App;
