import React from "react";
import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";
import Chat from "./Chat";
import Register from "./Register";
import socketIOClient from "socket.io-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernames: [],
      username: "",
      messages: []
    };

    this.socket = socketIOClient("localhost:8989");

    this.socket.on("RECIEVE_MESSAGE", data => {
      addMessage(data);
    });

    this.socket.on("UPDATE_USERNAMES", data => {
      this.setState({ usernames: data });
    });

    this.socket.on("RECIEVE_USERNAME", data => {
      this.setState({ username: data });
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
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
              <Chat
                username={this.state.username}
                socket={this.socket}
                messages={this.state.messages}
                usernames={this.state.usernames}
              />
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
