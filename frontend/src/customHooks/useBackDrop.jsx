import React from "react";
import { useState } from "react";
import "../css/customHooks.css";

const useBackDrop = () => {
  const [backDropState, setBackDropState] = useState(false);
    const btnStyle = {
    backgroundColor: backDropState ? '#6499e9ba' : ''
  }

  const hideBackDrop = () => {
    setBackDropState(false);
  };

  const showBackDrop = () => {

    setBackDropState(true);
  };

  const BackDrop = () => {
    return (
        <svg className="loader-spinner" viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
  <circle
    className="active"
    pathLength="360"
    fill="transparent"
    strokeWidth="32"
    cx="192"
    cy="192"
    r="176"
  ></circle>
  <circle
    className="track"
    pathLength="360"
    fill="transparent"
    strokeWidth="32"
    cx="192"
    cy="192"
    r="176"
  ></circle>
</svg>

    );
  };


  const BackDropModal = () =>  { 
    return ( backDropState ? <BackDrop/> : null )
  }

  return { BackDropModal, hideBackDrop, showBackDrop, backDropState, btnStyle};
};

export default useBackDrop;
