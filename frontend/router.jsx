// App.jsx (or App.vue for Vue.js)
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import App from "./src/App";
import AllEvents from "./src/Components/AllEvents";

function router() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/events" component={AllEvents} />
      </Switch>
    </Router>
  );
}

export default router;
