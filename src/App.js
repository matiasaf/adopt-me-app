import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { StrictMode } from "react";

import Details from "./Details";

function App() {
  return (
    <div>
      <Router>
        <header>
          <Link to="/">
            <h1> Adopt Me!</h1>
          </Link>
        </header>

        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/">
            <SearchParams />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
