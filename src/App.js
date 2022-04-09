import Header from "./components/Header";
import { Switch, Route, Redirect } from "react-router-dom";
import { routes } from "./routes/routes";

import "./assets/css/style.css";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <Switch>
        {routes.map((route, key) => (
          <Route
            key={key}
            exact={route.exact}
            path={route.path}
            render={() => {
              if (route.auth && !user) {
                return <Redirect to="/login" />;
              }
              if (route.admin && !status) {
                return <Redirect to="/" />;
              }
              return <route.component />;
            }}
          />
        ))}
      </Switch>
    </>
  );
}

export default App;
