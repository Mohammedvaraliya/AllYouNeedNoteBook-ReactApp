import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <ThreeCircles
        visible={true}
        height="40"
        width="40"
        color="#FFFFFF"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
