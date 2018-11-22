import React from "react";

const User = props => {
  const { username } = props;
  return <li className="list-group-item">{username}</li>;
};

export default User;
