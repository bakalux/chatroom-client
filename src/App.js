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
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/register" />
          <Route
            exact
            path="/room"
            component={() => (
              <Chat username={this.state.username} socket={this.socket} />
            )}
          />
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
