import React from "react";

const AboutusInfo = (props) => {
  return (
    <>
      <ol>
        {props.AboutusInfo.map((val, index) => {
          return <li key={index}>{val}</li>; // Add key prop to list items
        })}
      </ol>
    </>
  );
};

export default AboutusInfo;