import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "Modules/Home/Home";

interface MyProps {}

interface MyState {}

class App extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  public render() {
    return (
      <div className="">
        <Router>
          <React.Suspense fallback={"loading..."}>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    );
  }
}

export default App;
