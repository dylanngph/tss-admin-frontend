import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notify(props) {
  const { content } = props;

  useEffect(() => {
    const notify = () => toast(content);
    notify();
  }, [content]);
  
  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default Notify;
