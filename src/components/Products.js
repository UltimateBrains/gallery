import React, { useState  } from 'react';
import Product from './Product';
// import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from 'jquery'; 


const Products = React.memo(props =>{
   
   const { productDetails,block_index,shopDomain,productShow,removeClasses,setRemoveClasses,closeProduct } = props
   const [ checkout, setCheckout ] = useState([]);
   const [ getData, setGetData ] = useState(false);
   // const [ cartClass,setCartClass ] =  useState('');

   // useEffect(()=>{
   //  var cartClass = $("#mst-cart_count").attr('data-cart-class');
   //  setCartClass(cartClass);
   // });

   const addVariantToCart = (variantId, quantity,addCartBtntext,addingBtntext) =>{
   $(".sgcart-btn-"+variantId).html(addingBtntext);
   // var str = variantId.split("/"); 
   // var var_id = str[str.length - 1]; 
   var items = {
        id: variantId,
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
        setTimeout(()=>{  $(".sgcart-btn-"+variantId).html(addCartBtntext); },1000);
        fetch('/cart.js').then(response => response.json()).then(cartData => {
          setCheckout(cartData)

        if(cartData.item_count){
        //   console.log(cartData);
        }else{
           // console.log(data.description)
        }
        setTimeout(()=>{  $(".sgcart-btn-"+variantId).html(addCartBtntext); },1000);
        //console.log("customize close :",this.state.cart_auto_close)
        });   
    })
    .catch(err => { 
        //console.error("Error:", err)
      }); 
    }
     
    const TaggedProducts = () =>{
        let length =  productDetails.length;
        if(length > 0){setGetData(true)}  
        return (
          <>
          {(length > 0) &&  getData ?
            productDetails.map((product,index) => {
                      return (
                      <Product
                        closeProduct={closeProduct}
                        setRemoveClasses={setRemoveClasses}
                        removeClasses={removeClasses}
                        productShow={productShow} 
                        key={index}
                        addVariantToCart={addVariantToCart}
                        index={index}
                        product={product}
                        block_index={block_index}
                        shopDomain={shopDomain}
                      />
                    )
            })
            :
            <p> </p>
          }
          </>
          )
    }
  
  return(
      <div className="g-App">
        <TaggedProducts />
      </div>
    )

});
export default Products;