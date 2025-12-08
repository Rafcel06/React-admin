import React from "react";

const useGenerateAvatar = () => {

  const generateAvatar = ( text, foregroundColor = "white", backgroundColor = "black") => {

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 200;
    canvas.height = 200;


    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "100px Courier New";
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
