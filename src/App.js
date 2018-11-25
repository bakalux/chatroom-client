import React from "react";
import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";
import Chat from "./Chat";
import Register from "./Register";
import socketIOClient from "socket.io-client";

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
      this.setState({ usernames: data });
    });

    this.socket.on("RECIEVE_USERNAME", data => {
      this.setState({ username: data });
    });

    const addMessage = data => {
      console.log(data);
      const room = "lobby";

      this.setState({
        chatrooms: {
          [room]: {
            messages: [data, ...this.state.chatrooms[room].messages],
            ...this.state.chatrooms[room]
          },
          ...this.state.chatrooms
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
            path="/room/lobby"
            component={() => (
              <div>
                {this.state.chatrooms &&
                  Object.keys(this.state.chatrooms).map(chatroom => {
                    return <Link to={`/room/${chatroom.name}`} />;
                  })}
                <Chat
                  username={this.state.username}
                  socket={this.socket}
                  messages={this.state.chatrooms["lobby"].messages}
                  usernames={this.state.chatrooms["lobby"].usernames}
                />
              </div>
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
