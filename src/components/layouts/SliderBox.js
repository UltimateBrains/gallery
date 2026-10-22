import React,{ useState, useEffect} from 'react';
import ModalTagged from "../../components/modal-tagged"
import Carousel from "react-multi-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "react-multi-carousel/lib/styles.css";

const SliderBox = (props) =>{
  const {responseData,openModal,dataLength,block_index} = props;
  // console.log("slider props :::",props);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [index,setIndex ] = useState(0);
  // const [insta_image_id,setInstaImageId] = useState(null);
  // const [productInfo, setProductInfo] = useState([]);
  // const [productDetails, setProductDetails]  = useState([]);
  // const [dataLength, setDataLength ] = useState(8);
  const [setStart,setSetStart] = useState(false);

  useEffect(()=>{
    var AutoPlay = document.querySelectorAll(".mst-slider")[block_index].querySelector("#mst_auto_play").getAttribute("data-auto_play")
     updateAutoPlay(AutoPlay);
  },[]);

  const updateAutoPlay = (auto_play) =>{
    if(auto_play == "true"){
      setSetStart(true)
    }else{
      setSetStart(false)
    }

  }
  // var AutoPlay = document.querySelector('.mst_photo_gallery').getAttribute("data-auto_play");
 

  // if(AutoPlay.length > 0){
  //   console.log(AutoPlay);
  //   setAutoPlay(AutoPlay)  
  // }
  // if(element !== undefined){
  //   auto_Play = document.getElementsByClassName('auto_play')[block_index].getAttribute('data-auto_play');
  //   console.log(auto_Play);
  //   setAutoPlay(auto_Play)
  // }
    const arrowStyle = {
      background: "transparent",
      border: 0,
      color: "#fff",
      fontSize: "38px"
    };
    const CustomRight = ({ onClick }) => (
      <button className="arrowSlider right" onClick={onClick} style={arrowStyle}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    );
    const CustomLeft = ({ onClick }) => (
      <button className="arrowSlider left" onClick={onClick} style={arrowStyle}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    );
  // function openModal(e,idx,insta_image_id) {
  //   console.log("click");
  //   e.preventDefault();
  //   setModalIsOpen(true);
  //   setIndex(idx);
  //   setInstaImageId(insta_image_id);
  //   getProductInfo(idx,insta_image_id);
  // }

  // function closeModal(e) {
  //   e.preventDefault();
  //   setModalIsOpen(false);
  //   setInstaImageId([]);
  // }
  // const previous = (index,insta_image_id) => {
  //   console.log("index ",index,"insta_image_id ",insta_image_id)
  //   if (index > 0) {
  //     console.log("index",index)
  //     var idx = index - 1;
  //     setIndex(idx);
  //     getProductInfo(idx,insta_image_id);
  //   } else {
  //     return false;
  //   }
  // }

  // const next = (index,insta_image_id)=> {
  //   console.log("index ",index,"insta_image_id ",insta_image_id)
  //   var instafeeds_len = responseData.length - 1;
  //   if (index !== instafeeds_len) {
  //     console.log(index,"!==", instafeeds_len)
  //     var idx = index + 1;
  //     setIndex(idx);
  //     getProductInfo(idx,insta_image_id);
  //   } else {
  //     return false;
  //   }
  // }
  // const getProductInfo = useCallback((index,insta_image_id) =>{
  //   let prodcutIds = "";
  //   const formData = new FormData();
  //   var res = [];
  //   responseData.map((item,idx)=>{
  //     if(idx===index){
  //       var pData  = [];
  //        // setProductInfo(item.products);
  //        item.products.map((p,index)=>{
  //           pData.push("gid://shopify/Product/"+p.product_id);
  //           prodcutIds = pData.join(', ');
  //        });
  //        formData.append("product_ids",prodcutIds);
  //        formData.append("shop_domain",shopDomain)
  //        axios({
  //             method: "post",
  //             url: ngrokUrl + "/api/getProductDetails?shop="+shopDomain,
  //             data:formData,
  //             headers: { "Content-Type": "multipart/form-data" },
  //           }).then((response) => {
  //               setProductDetails(response.data)
  //               // setMounted(true);
  //           }).catch((error) => {
  //             console.log(error)
  //           })
        
  //     }
  //   })
  // });

  // const getProductInfo = useCallback((index,insta_image_id) =>{
  //   let prodcutIds = "";
  //   const formData = new FormData();
  //   responseData.map((item,idx)=>{
  //     if(idx===index){
  //       var pData  = [];
  //        setProductInfo(item.products);
  //        item.products.map((p)=>{
  //           pData.push(p.product_id);
  //           prodcutIds = pData.join(', ');
  //        });
  //        formData.append("product_ids",prodcutIds);
  //        formData.append("shop_domain",shopDomain);
  //        axios({
  //             method: "post",
  //             url: ngrokUrl + "/api/getProductDetails?shop="+shopDomain,
  //             data:formData,
  //             headers: { "Content-Type": "multipart/form-data" },
  //           }).then((response) => {
  //               setProductDetails(response.data)
  //           }).catch((error) => {
  //             console.log(error)
  //           })
        
  //     }
  //   })
  // });

  const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
              },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3,
              slidesToSlide: 3 // optional, default to 1.
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
              slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
              slidesToSlide: 1 // optional, default to 1.
            }
          };
    
  return(
    <>
    <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={setStart}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 390ms ease-in-out"
          transitionDuration={800}
          containerClass="carousel-container"
          dotListClass="react-multi-carousel-dot-list"
          itemClass="carousel-item-padding-40-px"
          rewindWithAnimation={true}
          customRightArrow={<CustomRight />}
          customLeftArrow={<CustomLeft />}

    >
         {responseData.map((res,idx)=>{
          return(<>
            {
            (dataLength >= idx) &&
             <div><img className="img-tag" src={res.src} onClick={(e) => openModal(e,idx,res.insta_image_id)}  alt=""/></div>
            }</>)
        })}  
    </Carousel>
   {/* { modalIsOpen &&
     <ModalTagged 
          openModal ={openModal}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setModalIsOpen={setModalIsOpen}
          responseData={responseData}
          insta_image_id={insta_image_id}
          index={index}
          previous={previous}
          next={next}
          productInfo={productInfo}
          setInstaImageId={setInstaImageId}
          getProductInfo={getProductInfo}
          productDetails={productDetails}
          block_index={block_index}
          shopDomain={shopDomain}
     />
   }*/}
  </>
  )
}

export default SliderBox;