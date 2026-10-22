import React, { memo, useEffect ,useState  } from 'react';
import Product from './Product';
import axios from 'axios'
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from 'jquery'; 


const Products = React.memo(props =>{
  console.log("Products loading ...")
   const  { productData } = props
   const [ isCartOpen ,setIsCartOpen ] = useState(false);
   const [ checkout, setCheckout ] = useState([]);
   const [ collections,setCollections ] = useState([]);
   const [ cart_auto_close,setCartAutoClose ] = useState('true');
   const [ shopUrl,setShopUrl ] = useState('');
   const [ mounted , setMounted ] = useState(false)

      const addVariantToCart = (variantId, quantity) =>{
      var str = variantId.split("/"); 
      var var_id = str[str.length - 1]; 
      var items = {
        id: var_id,
        quantity: quantity
      }
      const searchParams = Object.keys(items).map((key) => {
          return encodeURIComponent('items[0]['+key+']') + '=' + encodeURIComponent(items[key]);
      }).join('&');

      fetch(`/cart/add.js`, {
        method: 'POST',body: searchParams,
        headers: {
           "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(res => res.json()).then(data => {
        fetch('/cart.js').then(response => response.json()).then(cartData => {
          setCheckout(cartData)
          //console.log("customize close :",this.state.cart_auto_close)
          if(this.state.cart_auto_close=='true'){
            setTimeout(()=>{
              setIsCartOpen(false)
            },3000)
          }
        });   
      })
      .catch(err => { 
        //console.error("Error:", err)
      }); 
    }
  
  return(
    <div className="Product-wrapper">
    {
        productData.length > 0 &&
        productData.map((product,index) => {
          
        return (
         
          <Product
            addVariantToCart={addVariantToCart}
            key={index}
            index={index}
            product={product}
          />
        
        )

      })
      }
     
    </div>
    )

});
export default Products;