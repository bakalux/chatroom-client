import React from "react";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    const { socket, setUsername } = this.props;

    this.sendUsername = e => {
      e.preventDefault();
      socket.emit("SEND_USERNAME", {
        username: this.state.username
      });
      setUsername(this.state);
      return <Redirect exact to="/room" />;
    };
  }
  render() {
    return (
      <form className="form-horizontal">
        <div className="col-md-6">
          <div className="form-group">
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <div className="input-group-addon" style={{ width: 2.6 + "rem" }}>
                <i className="fa fa-user" />
              </div>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="John"
                required
                autoFocus
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
                value={this.state.username}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <button onClick={this.sendUsername} className="btn">
            <i className="fa fa-user-plus" /> Register
          </button>
        </div>
      </form>
    );
  }
}

export default Register;
