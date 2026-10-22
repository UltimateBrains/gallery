import React from "react";

const Loading = () => {
  return (
    // <div className="loading-container">
    //   <div className="lds-ripple">
    //     <div></div>
    //     <div></div>
    //   </div>
    // </div>
    <div class="wrapper">
      <div class="loading-text"> 
          <h4>LOADING
            <span class="dot-one"> .</span>
            <span class="dot-two"> .</span>
            <span class="dot-three"> .</span>
          </h4>
    </div> 
  </div>
  );
};

export default Loading;