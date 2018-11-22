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

    const { socket, username } = this.props;

    this.sendMessage = e => {
      e.preventDefault();
      socket.emit("SEND_MESSAGE", {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: "" });
    };

    socket.on("RECIEVE_MESSAGE", data => {
      addMessage(data);
    });

    socket.on("RECIEVE_USERNAMES", data => {
      this.setState({ usernames: data });
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map(message => {
                    return (
                      <div>
                        {message.author}: {message.message}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-footer">
                <input
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  onChange={e => {
                    this.setState({ message: e.target.value });
                  }}
                  value={this.state.message}
                />
                <br />
                <button
                  onClick={this.sendMessage}
                  className="btn btn-primary form-control"
                >
                  Send
                </button>
              </div>
            </div>
            <ul className="list-group">
              {this.state.usernames &&
                this.state.usernames.map(username => {
                  return <User username={username} />;
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
