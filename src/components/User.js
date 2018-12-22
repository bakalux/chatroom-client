import React from "react";

const User = props => {
  const { username } = props;
  return <li>{username}</li>;
};

export default User;
