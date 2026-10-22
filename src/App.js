import './grid.css';
import './custom.css';
// import CSSTransitionGroup from 'react-transition-group/CSSTransition';

import ImageGallery from "./components/imagegallery";
// const ngrokUrl = "https://sgallery.myshopapps.com";
const ngrokUrl = "https://loose-declaration-notices-wav.trycloudflare.com";

function App(props) {
    var  list = document.getElementsByClassName('mst-slider');
 
    // var arr = Array.prototype.slice.call(list )
    // console.log(arr);
    return ( 
        <>
        {
        Object.entries(list).map((val, index) => ( 
            <div key={index}>
                <ImageGallery block_index={index} ngrokUrl={ngrokUrl}  />   
            </div>
        ))
        }
        </>    
    );
}

export default App;