import React, { useEffect } from "react";

const Alert = ({ removeAlert, ...alert }) => {
  let { msg, type } = alert;
  useEffect(() => {
    let timeOut = setInterval(() => {
      removeAlert();
    }, 3000);
    return () => clearInterval(timeOut);
  }, []);
  return <div className={`alert alert-${type}`}>{msg}</div>;
};

export default Alert;
