import React, { useEffect, useState, useRef} from 'react';
import VariantSelector from './VariantSelector';
// import { faWindowClose,faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = (props) =>{
  const { addVariantToCart,index,product,block_index,shopDomain,productShow,removeClasses,setRemoveClasses,closeProduct } = props;
  // const [ options, setOptions ] = useState(false);
  const [ showOpt, setShowOpt ] = useState(false);
  // const [ custom_btn_style,setCustomBtnStyle ] = useState({});
  // const [ img_size,setImgSize ] = useState("100X100");
  const [ selectedVariantImage,setSelectedVariantImage ] = useState({});
  const [ selectedVariantPrice,setSelectedVariantPrice ] = useState(null);
  const [ selectedVariant,setSelectedVariant ] = useState([]);
  const [ selectedVariantQuantity,setSelectedVariantQuantity ] = useState([]);
  const [ selectedOptions, setSelectedOptions ] = useState({});
  const [ addbtnColor,setAddBtnColor] = useState('#000000');
  const [ addCartBtntext,setAddCartBtnText ] = useState("Add to cart");
  const [ addingBtntext,setAddingBtnText ] = useState("Adding...");
  const [ showOptiontext,setShowOptionText ] = useState("Show Option");
  const [ hideOptiontext,setHideOptionText ] = useState("Hide Options");
  const [ soldouttext,setSoldOutText ] =  useState("Sold Out");
  const [ productViewbtntext,setProductViewBtnText ] =  useState("Product View"); 
  const [ outOfStocktext,setOutOfStockText ] = useState("Out of Stock");
  const [ isDivOpen, setIsDivOpen] = useState(false);

  let  addToCartBtn = document.querySelectorAll(".mst-slider")[block_index].querySelector("#add-to-cart-btn").getAttribute("data-add_to_cart");
  const divRef = useRef(null);

  useEffect(()=>{
    let allText  = JSON.parse(document.querySelector('#sg-app').getAttribute("data-rebtn_transl"));
    // console.log(allText);
    setAddCartBtnText(allText.add_to_cart_text);
    setShowOptionText(allText.show_options_txt);
    setHideOptionText(allText.hide_options_txt);
    setSoldOutText(allText.sold_out_txt);
    setProductViewBtnText(allText.product_view_txt);
    setOutOfStockText(allText.out_of_stock_txt);
    setAddingBtnText(allText.adding_text);
    let defaultOptionValues = {};
    product.options.forEach((selector) => {
      defaultOptionValues[selector.name] = selector.values[0];
   });
    setSelectedOptions(defaultOptionValues);
    // setSelectedVariantImage(product.images.edges[0].node);
    setSelectedVariantImage(product.media.edges[0].node.image);

    setTimeout(()=>{
        getbtnColor();

    },500)
     // const handleScroll = () => setIsDivOpen(false);
    let viewSize  = window.innerWidth;
     console.log("viewSize",viewSize);
     if(viewSize >= 1440){
        document.querySelectorAll('.hide-product').forEach(function(element) {
            element.classList.remove('hide-product');
        });
        
        
     }
      if(removeClasses  === true){
         document.querySelectorAll('.hide-product').forEach(function(element) {
            element.classList.add('show-product');
        });
      }

    //  return () => {
    //   window.removeEventListener('touchmove', handleScroll);
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  },[]);
   
  const handleScroll = () => {
    console.log("scroll...");
      // setRemoveClasses(true);
      closeProduct();
   }
  
  const handleClickOutside = () => {
    console.log("click...");
    // closeProduct();
      // if (divRef.current && !divRef.current.contains(event.target)) {
      //   setIsDivOpen(false);
      //   setRemoveClasses(true);
        
      // }
  };
  window.addEventListener('touchmove', handleScroll);
  // document.addEventListener('click', handleClickOutside);

  const getbtnColor = () =>{
    var btnColor = "";
    var ele = document.getElementsByClassName('mst-slider')[0].querySelector("#mst_add_cart_btn");
    if(ele){ 
      btnColor = document.getElementsByClassName("mst-slider")[block_index].querySelector("#mst_add_cart_btn").getAttribute("data_gallery_id");
      setAddBtnColor(btnColor);
    }
  }

  const handleOptionChange = (event) => {
    // console.log("handleOptionChange::",event)
    const target = event.target;
    selectedOptions[target.name] = target.value;
    const data= variantForOptions(product, selectedOptions);
    // console.log("data",data);
    if(data){
      setSelectedVariant(data.node);
      setSelectedVariantImage(data.node.image);
      // console.log("price ::",data.node.price)
      setSelectedVariantPrice(data.node.price);
    }
  }
  const variantForOptions =(product, options) => {
      return product.variants.edges.find((variant) => {
        return variant.node.selectedOptions.every((selectedOption) => {
          return options[selectedOption.name] === selectedOption.value.valueOf();
        });
      });
  }
  const showOpts =(flag,idEle,qty,opts)=>{
      var isShow = isShowOpt(qty,opts);
      setShowOpt(prevState => ({ showOpt: !isShow }))
      if(flag === 1){
        setShowOpt(true)
      }else{
        setShowOpt(false)
      }
  }
  const isShowOpt =(qty,opts)=>{
    if(opts > 0){
      return false;
    }else{
      return true;
    }
  }
  const handleQuantityChange=(event)=> {
      setSelectedVariantQuantity(event.target.value);

  }
  let variantSelectors = product.options.map((option,index) => {
      return (
        <VariantSelector
          handleOptionChange={handleOptionChange}
          key={index}
          option={option}
        />
      );
  });
  const getBtnText = (quantity,policy,availableForSale)=>{
      if(availableForSale) {
        if(policy ==='CONTINUE' && availableForSale ===false) {
          return addCartBtntext;
        }else{
          return addCartBtntext;
        }
      }else{
         return soldouttext;
      }
  }
  // const getBtnText =(quantity,policy,inv_managment)=>{
  //       if(inv_managment === "SHOPIFY" || inv_managment === "NOT_MANAGED"){
  //           if(quantity <= 0 && policy !== 'CONTINUE'){
  //                 return soldouttext;
  //           }else if((quantity <= 0 && policy === 'CONTINUE') || quantity > 0) {
  //                 return addCartBtntext;
  //           }
  //       }else{
  //           return addCartBtntext;
  //       }
  // }
  const OpenProductPage = () =>{
    window.location.href = `https://${shopDomain}/products/${product.handle}`;
  }

  let variantImage ="https://photogallery.shopemailer.com/assets/no-image-icon.png";
  var img={src:'https://photogallery.shopemailer.com/assets/no-image-icon.png'};
  if(product.media.edges.length > 0){
     console.log("image url :",product.media.edges[0].node.image);
      variantImage = selectedVariantImage || product.media.edges[0].node.image
  }else{
      variantImage = selectedVariantImage || img 
  }
  let variant =  product.variants.edges[0].node
  // console.log("selectedVariant",selectedVariant);
  var parts = variant.id.split('/');
  var variantSegment = "";
   variantSegment = parts.pop() || parts.pop();
  if(selectedVariant.length != 0){
    variantSegment = selectedVariant.legacyResourceId;// parts.pop() || parts.pop(); 
  }
 // console.log("variantSegment",variantSegment);
 // console.log("inventoryPolicy",variant.inventoryPolicy);
  // let variantQuantity =  1 ;
 console.log(product.handle,"==",productShow);
 // console.log("selectedVariantPrice",selectedVariantPrice);
  return(
  // <div  className={`product-container ${product.handle === productShow ? "show-product" : "hide-product" }`} key={index}>
    <div  className={`product-container`} key={index}>
      <div className="product-row">
         <div className="col-md-4 mb-5 bg-white">
            {product.media.edges.length ?   <img className="product-image" src={variantImage.url} alt={`${product.title} product`} /> : null}
         </div> 
         <div className="col-md-8">
        
          <div className="product-content">
            <span className="product-title"><a className="product-link" href={"https://"+shopDomain+"/products/"+product.handle}>{product.title}</a></span>
            <div className="product-price">${selectedVariantPrice == null ? variant.price : selectedVariantPrice}</div>
           { (variant.inventoryQuantity > 0) || (variant.inventoryPolicy == "CONTINUE")  ? "" : <small className="product-out-of-stock">{outOfStocktext}</small> }
           { (addToCartBtn === "true")  ?
           <> 
            { product.options[0].values.length > 1 ?
              <>
              { !showOpt ?
                  <>
                   <button id={index} className="btn-show showOpt" { ...(isShowOpt(variant.inventoryQuantity,product.options[0].values.length) && { disabled: true } ) } 
                  onClick={()=> showOpts(1,index,variant.inventoryQuantity,product.options[0].values.length)} >{showOptiontext}</button>
                  </>
                 :
                 <>
                 <div className="variant-row">
                   <button id={index} className="btn-show showOpt" { ...(isShowOpt(variant.inventoryQuantity,product.options[0].values.length) && { disabled: true } ) } 
                  onClick={()=> showOpts(0,index,variant.inventoryQuantity,product.options[0].values.length)} >{hideOptiontext}</button> 
                    {variantSelectors}
                    <div className="checkout-block">
                      <button /*style={{"backgroundColor":addbtnColor}} */ className={`cart-btn addToCart sgcart-btn-${variantSegment}`} { ...( variant.inventoryQuantity <= 0 && { disabled: getBtnText(variant.inventoryQuantity, variant.inventoryPolicy,variant.availableForSale)===soldouttext ? 'disabled' : null} ) } onClick={() => addVariantToCart(variantSegment, selectedVariantQuantity,addCartBtntext,addingBtntext)}>{getBtnText(variant.inventoryQuantity, variant.inventoryPolicy,variant.availableForSale)}</button>
                    </div>
                 </div>
                 </>
              }
              </>
              :
              <>
              { variant.inventoryQuantity > 0 ?
                  <>
                  <div className="checkout-block">
                      <button className={`cart-btn addToCart sgcart-btn-${variantSegment}`} { ...( variant.inventoryQuantity <= 0 && { disabled: getBtnText(variant.inventoryQuantity, variant.inventoryPolicy,variant.availableForSale)===soldouttext ? 'disabled' : null} ) } onClick={() => addVariantToCart(variantSegment, selectedVariantQuantity,addCartBtntext,addingBtntext)}>{getBtnText(variant.inventoryQuantity, variant.inventoryPolicy,variant.availableForSale)}</button>
                  </div>
                  </>  
                  :
                  <>
                  <div className="checkout-block">
                    <button className={`cart-btn addToCart sgcart-btn-${variantSegment}`} { ...( variant.inventoryQuantity <= 0 && { disabled: getBtnText(variant.inventoryQuantity, variant.inventoryPolicy,variant.availableForSale)===soldouttext ? 'disabled' : null} ) } onClick={() => addVariantToCart(variantSegment, selectedVariantQuantity,addCartBtntext,addingBtntext)}>{getBtnText(variant.inventoryQuantity, variant.inventoryPolicy,variant.availableForSale)}</button>
                  </div>
                  </>
               }
              </>
            }
            </>
            :
            <>
            <button className="btn-show showOpt" onClick={() => OpenProductPage()}>{productViewbtntext}</button>
            </>
          } 
          </div>
        </div>
      </div>
    </div>
    );
};
export default Product;