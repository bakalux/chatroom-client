import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "./Register";
import socketIOClient from "socket.io-client";
import ChatroomContainer from "./ChatroomContainer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",

      chatrooms: {
        lobby: {
          usernames: [],
          messages: []
        },
        pomoika: {
          usernames: [],
          messages: []
        },
        doka: {
          usernames: [],
          messages: []
        }
      }
    };

    this.socket = socketIOClient("localhost:8989");

    this.socket.on("RECIEVE_MESSAGE", data => {
      addMessage(data);
    });

    this.socket.on("UPDATE_USERNAMES", data => {
      const room = "lobby";
      this.setState({
        chatrooms: {
          ...this.state.chatrooms,
          [room]: {
            ...this.state.chatrooms[room],
            usernames: data
          }
        }
      });
    });

    this.socket.on("RECIEVE_USERNAME", data => {
      this.setState({ username: data });
    });

    const addMessage = data => {
      console.log("data name", data.name);
      const room = data.name;

      const message = {
        author: data.author,
        message: data.message,
        time: data.time
      };

      this.setState({
        chatrooms: {
          ...this.state.chatrooms,
          [room]: {
            ...this.state.chatrooms[room],
            messages: [...this.state.chatrooms[room].messages, message]
          }
        }
      });
      console.log(this.state.chatrooms[room].messages);
    };
  }

  render() {
    console.log(this.state.chatrooms);
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/register" />
          <Route
            exact
            path="/room/:name"
            render={props => (
              <ChatroomContainer
                {...props}
                socket={this.socket}
                username={this.state.username}
                chatrooms={this.state.chatrooms}
              />
            )}
          />
          <Route
            exact
            path="/register"
            component={() => <Register socket={this.socket} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
