import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Chat from "./Chat";
import Register from "./Register";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    this.socket = socketIOClient("localhost:8989");
    this.setUsername = username => {
      this.setState({ username: username });
      //ne robit sobaka
      console.log(this.state.username);
    };
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/register" />
          <Route exact path="/room" component={Chat} />
          <Route
            exact
            path="/register"
            component={() => (
              <Register setUsername={this.setUsername} socket={this.socket} />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
