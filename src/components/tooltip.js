import React, {useState,useRef} from 'react';
import './tooltip.css';
import {CSSTransition} from 'react-transition-group';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


function Tooltip({position = 'top',  handle,children}) {
  const [isVisible, setIsVisible] = useState(false);
  let prodcutImgUrl ="";
  const [productInfo,setProductInfo] = useState("");
  let productPrice ="";
  if(productInfo){
    prodcutImgUrl = productInfo.image.src;
    productPrice  = productInfo.variants.map((variant)=>{
        return  variant.price[0];
    });
  }
  const node = useRef(null);
  const toggle = () => {  setIsVisible(!isVisible); }
  let style: ITooltipStyle = {};
   if (node.current && node.current.offsetWidth) {
        if (position === 'top' || position === 'bottom') {
            style.left = `${String(node.current.offsetWidth / 2)}px`;
        } else {
            style.top = `-${String(node.current.offsetHeight / 1.5)}px`;
        }
    }
  return (
     <div className="Tooltip">
            <div
                className="Tooltip__toggler"
                onMouseOverCapture={toggle}
                onMouseOut={toggle}
                ref={node}>
                {children}
            </div>
             <CSSTransition
                in={isVisible}
                timeout={0}
                classNames="Tooltip"
                unmountOnExit>
                 <div
                    className={`Tooltip__message Tooltip__message--${position}`}
                    style={style}>
                    {handle}
                </div>
             </CSSTransition>
        </div>
  );
}
export default Tooltip;