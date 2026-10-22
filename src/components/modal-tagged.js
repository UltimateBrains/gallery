import React,{ useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { faChevronRight, faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Products from '../components/Products';
import Tooltip from '../components/tooltip';

// ReactModal.setAppElement('#sg-app');
const ModalTagged = (props) =>{
  const {shopDomain,productDetails,getProductInfo,index,modalIsOpen,closeModal,responseData,insta_image_id,next,previous,setInstaImageId,mounted,block_index } = props
  const [ imageHeight,setImageHeight ] = useState(''); 
  const [ filterProduct,setFilterProduct] = useState(productDetails); 
  const [ showClass, setShowClass ] = useState(false);
  const [ imageURL, setImageURL ] = useState("");
  const [ mobileView, setMobileView ] = useState(false);
  const [ productShow, setProductShow ] = useState("");
  const [ hideCloseBtn,setHideCloseBtn ] = useState(false);
  const [ removeClasses, setRemoveClasses ] = useState(false);
  var viewSize = "";
  useEffect(()=>{
    console.log("productDetails ModalTagged::",productDetails);
    
       if(responseData.length > 0){
        responseData.map((res,i)=>{
            if(index === i){
              setImageURL(res.src);
              // imageURL = res.src;
              getProductInfo(res.insta_image_id);
              setInstaImageId(res.insta_image_id);
            }
        })
       }
      
    setTimeout(()=>{
  
      var img = document.querySelector(".modal__img");
      var windowHeight = window.outerHeight;
      var mst_modal_content = document.querySelector(".mst-modal-content");
      var mst_modal_width = mst_modal_content.offsetWidth;
      if(img){
        var imgHeight = img.height;
        var naturalHeight = img.naturalHeight;
        var naturalWidth = img.naturalWidth;
      }
      console.log("naturalHeight",naturalHeight,"naturalWidth",naturalWidth,"mst_modal_width",mst_modal_width)
      if(imgHeight > windowHeight){
            // mst_modal_content.style.height = windowHeight+'px';
            var wHeight  = windowHeight+'px';
            setImageHeight(wHeight);
            setShowClass(true)
        }else{
            // mst_modal_content.style.height = imgHeight+'px';
            var IHeight = imgHeight+'px';
            setImageHeight(IHeight);
            setShowClass(true)

        }
     
        if(naturalWidth > mst_modal_width){
          setTimeout(()=>{
            var s = document.querySelector(".mst-modal-img");
            console.log("s ::",s);
            var renderedHeight,renderedWidth;

            let aspectRatio = img.naturalWidth / img.naturalHeight;
            console.log("aspectRatio",aspectRatio);
            console.log("s.offsetHeight",s.offsetHeight,"s.offsetWidth",s.offsetWidth);
              
            renderedWidth = parseFloat((s.offsetHeight * aspectRatio).toFixed(2));
            renderedHeight = parseFloat((s.offsetWidth / aspectRatio).toFixed(2));

            console.log("NEW DIV width:",renderedWidth,"NEW DIV height:",renderedHeight);
            // if(img.naturalWidth > img.naturalHeight)
            console.log("image naturalHeight ::",img.naturalHeight," renderedHeight ::",renderedHeight);
            if(img.naturalHeight  > renderedHeight )
            {
            console.log('Width is large',s);
            s.style.height = renderedHeight+'px';
            s.querySelector('.modal__left').style.height = renderedHeight;
            }
            },700)
          }
       
      
      console.log('Current image height:',imgHeight);
      console.log('Current window height:',windowHeight);
      var modal_right = document.querySelector(".modal__right");
      if(modal_right) {
        modal_right.style.height = imgHeight+'px';
      }
    },700)
     viewSize  = window.innerWidth;
     console.log("viewSize",viewSize);
      if(viewSize >= 1440){

        setMobileView(false);
        setHideCloseBtn(false);
      }
      setFilterProduct(productDetails);
    },[productDetails])
  
  const handleTooltip= (handle)=>{
     // console.log("tooltip clicked",handle)
       let viewSize  = window.innerWidth;
       let filterData = productDetails.filter((node)=>node.handle==handle);
       setFilterProduct(filterData); 
       setProductShow(handle);
       setHideCloseBtn(true)
      
        if(viewSize <= 425){
          setMobileView(true);
        }
    
  }
  const closeProduct = ()=>{
    console.log("close product clicked....");
    setProductShow(false);
    setFilterProduct(productDetails);
    setHideCloseBtn(false);
    // setRemoveClasses(true);
    setMobileView(false);
    document.querySelectorAll('.product-container').forEach(function(element) {
            element.classList.remove('hide-product');
            element.classList.add('show-product');
    });
    
  }
   const tagPoints =  responseData.map((item,i)=>(
    (index  === i) ?
      item.products.map((product)=>
        <>
        <div style={{"position":"absolute", "top":(product.top_cord-2.92)+"%","left":product.left_cord+"%"}} >
           { (window.innerWidth >= 1440) ? 
            <Tooltip handle={product.handle} position="top" key="tooltip-1">
                  <div className="pulsating-circle"></div>
            </Tooltip>
            :
            <div className="pulsating-circle onclick" onClick={()=> handleTooltip(product.handle)}></div>
           }
        </div> 
        </>)
      : null
    ))

  return(    
       <ReactModal
         isOpen={modalIsOpen}
         contentLabel="onRequestClose Example"
         onRequestClose={closeModal}
         ariaHideApp={false}
         className="sj-mst_container"
         portalClassName='mst_gallery_wrapper'
        >
        <span className="modal_close" onClick={(e) => closeModal(e)} ><span><FontAwesomeIcon icon={faXmark} /></span></span>
         { index !== 0 && <span className="arrow prev" onClick={(e) => previous(index,insta_image_id)}><FontAwesomeIcon icon={faChevronLeft} /></span> }
         { index !== responseData.length - 1  &&
        <span className="arrow next" onClick={(e) => next(index,insta_image_id)}><FontAwesomeIcon icon={faChevronRight} /></span> }
        <div className={`mst-modal-content ${!productDetails.length && 'mst-wrapper' }` }>
           <div className={`img-box ${ !productDetails.length ? "img-container" : ""}`}>
             <div className={`mst-modal-img`} style={{ "height":imageHeight }}>
                <div className="modal__left">
                    {tagPoints}
                    <img className={`modal__img ${ !showClass ?  " mst-sg-height" : "" }`} src={imageURL} alt="" />
                </div>
              </div>
            </div>
           { productDetails.length ?
           <>
            <div className="product-box">
            <div className={`${ productShow ? "mobimg-block mob-product-box" : "mob-product-box" }`}  id="mob-img-sec">
            {  hideCloseBtn &&
              <span className="product_close" onClick={closeProduct} ><span><FontAwesomeIcon icon={faXmark} /></span></span>
              }
              <div className="modal__right">
                <Products setRemoveClasses={setRemoveClasses} closeProduct={closeProduct} removeClasses={removeClasses} productShow={productShow} shopDomain={shopDomain} block_index={block_index} key={index} index={index} productDetails={filterProduct} mounted={mounted} />
              </div>
            </div>
            </div>
            </>
            : null
           }
         </div>
      </ReactModal>
   )


}
export default ModalTagged;