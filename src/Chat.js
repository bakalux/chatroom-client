import React from "react";
import User from "./User";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: [],
      usernames: []
    };

    const { socket } = this.props;

    this.sendMessage = e => {
      e.preventDefault();
      if (this.state.message !== "") {
        socket.emit("SEND_MESSAGE", {
          author: socket.username,
          message: this.state.message
        });
        this.setState({ message: "" });
      }
    };

    socket.on("RECIEVE_MESSAGE", data => {
      addMessage(data);
    });

    socket.on("UPDATE_USERNAMES", data => {
      this.setState({ usernames: data });
    });

    socket.on("RECIEVE_USERNAME", data => {
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
      <div className="chatroom-container">
        <ul className="user-list">
          {this.state.usernames &&
            this.state.usernames.map(username => {
              return <User username={username} key={username.toString()} />;
            })}
        </ul>
        <div className="chat">
          <div className="chat-messages">
            {this.state.messages.map(message => {
              return (
                <div key={message.id}>
                  <span class="time">{message.time}</span> {message.author}:{" "}
                  <span class="chat-message">{message.message}</span>
                </div>
              );
            })}
          </div>

          <form onSubmit={this.sendMessage}>
            <input
              className="input-message"
              type="text"
              autoFocus
              placeholder="Message"
              onChange={e => {
                this.setState({ message: e.target.value });
              }}
              value={this.state.message}
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
