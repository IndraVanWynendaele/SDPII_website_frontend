import React from "react";

const ProductInfo = (props) => {
  return (
    <>
      <ol>
        {props.productInfo.map((val, index) => {
          return <li key={index}>{val}</li>; // Add key prop to list items
        })}
      </ol>
    </>
  );
};

export default ProductInfo;