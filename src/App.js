import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Newscomponent from "./components/Newscomponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
    };
  }

  setProgress = (value)=>{
    this.setState(
      {
        progress:value
      }
    );
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar setProgress={this.setProgress}/>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}  
            onLoaderFinished={() => this.setProgress(0)}
            loaderSpeed={1000}
          />
          <Switch>
            <Route exact path="/">
              <Newscomponent setProgress={this.setProgress}
                key="general"
                page_size={9}
                country={"in"}
                category={"general"}
              />
            </Route>
            <Route exact path="/business">
              <Newscomponent setProgress={this.setProgress}
                key="business"
                page_size={9}
                country={"in"}
                category={"business"}
              />
            </Route>
            <Route exact path="/entertainment">
              <Newscomponent setProgress={this.setProgress}
                key="general"
                page_size={9}
                country={"in"}
                category={"entertainment"}
              />
            </Route>
            <Route exact path="/health">
              <Newscomponent setProgress={this.setProgress}
                key="health"
                page_size={9}
                country={"in"}
                category={"health"}
              />
            </Route>
            <Route exact path="/science">
              <Newscomponent setProgress={this.setProgress}
                key="science"
                page_size={9}
                country={"in"}
                category={"science"}
              />
            </Route>
            <Route exact path="/sports">
              <Newscomponent setProgress={this.setProgress}
                key="sports"
                page_size={9}
                country={"in"}
                category={"sports"}
              />
            </Route>
            <Route exact path="/technology">
              <Newscomponent setProgress={this.setProgress}
                key="technology"
                page_size={9}
                country={"in"}
                category={"technology"}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
