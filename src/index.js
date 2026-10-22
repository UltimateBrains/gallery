import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('sg-app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// var  list = document.getElementsByClassName('mst-gallery-root');

// if(list.length > 0 ){

// var index = 0
// for (let ele of list) {

//   const root = ReactDOM.createRoot(ele);

//     root.render(
//        <React.StrictMode>
//         <App galleryBlock={index}  />
//       </React.StrictMode>
//     );
//     index+=1;
// }
// }else{
   
//   var  list = document.getElementsByClassName('mst-gallery-root');
//   const root = ReactDOM.createRoot(list);
//     root.render(
//       //<React.StrictMode>
//         <App galleryBlock="0" />
//       // </React.StrictMode>
//     );
// }


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
