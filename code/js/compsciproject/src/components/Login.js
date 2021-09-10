import React, { useContext } from "react";
import authContext from "./authcontext.js";

export default () => {
  const { setAuthenticated } = useContext(authContext);
  const handleLogin = () => setAuthenticated(true);
  const handleLogout = () => setAuthenticated(false);

  return (
    <React.Fragment>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleLogout}>logout</button>
    </React.Fragment>
  );
};