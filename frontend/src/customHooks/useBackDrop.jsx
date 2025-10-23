import React from "react";
import { useState } from "react";
import "../css/customHooks.css";

const useBackDrop = () => {
  const [backDropState, setBackDropState] = useState(false);

  const hideBackDrop = () => {
    setBackDropState(false);
  };

  const showBackDrop = () => {
    setBackDropState(true);
  };

  const BackDrop = () => {
    return (
      <div className="backdrop-container">
        <div className="spinner">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  };


  const BackDropModal = () =>  { 
    return ( backDropState ? <BackDrop/> : null )
  }

  return { BackDropModal, hideBackDrop, showBackDrop };
};

export default useBackDrop;
