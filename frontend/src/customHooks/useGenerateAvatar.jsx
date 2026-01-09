import React from "react";

const useGenerateAvatar = () => {



  const getNearWhiteColor = () => {
    const r = Math.abs(Math.floor(Math.random() * 155) - 220); 
    const g = Math.abs(Math.floor(Math.random() * 155) - 220);
    const b = Math.abs(Math.floor(Math.random() * 155) - 220);

    

    return `rgb(${r}, ${g}, ${b})`;
  };;

  const generateAvatar = ( text, foregroundColor = "white") => {

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 200;
    canvas.height = 200;


    context.fillStyle = getNearWhiteColor();
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 100px Courier New";
    context.fillStyle = foregroundColor;

    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(
      text[0].toUpperCase(),
      canvas.width / 2,
      canvas.height / 2
    );


   
       return canvas.toDataURL("image/png");
  };

  return { generateAvatar };
};

export default useGenerateAvatar;
