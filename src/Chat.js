import React from "react";
import User from "./User";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    const { socket, name } = this.props;

    this.sendMessage = e => {
      e.preventDefault();
      console.log(name);
      if (this.state.message !== "") {
        socket.emit("SEND_MESSAGE", {
          author: socket.username,
          message: this.state.message,
          name: name
        });
        this.setState({ message: "" });
      }
    };
  }

  render() {
    const { usernames, messages } = this.props;
    return (
      <div className="chatroom-container">
        <ul className="user-list">
          {usernames &&
            usernames.map(username => {
              return <User username={username} key={username.toString()} />;
            })}
        </ul>
        <div className="chat">
          <div className="chat-messages">
            {messages.map(message => {
              return (
                <div key={message.id}>
                  <span className="time">{message.time}</span> {message.author}:{" "}
                  <span className="chat-message">{message.message}</span>
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
