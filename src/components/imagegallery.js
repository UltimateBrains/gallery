import React,{ useState,useCallback, useEffect } from 'react';
import axios from "axios";
import ModalTagged from "../components/modal-tagged";
import Grid from "../components/layouts/grid-layout";
import SliderBox from '../components/layouts/SliderBox';
import Masonry from '../components/layouts/masonry-layout2';

const ImageGallery = (props)=>{
  const { ngrokUrl,block_index} = props;
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ index,setIndex ] = useState(0);
  const [ insta_image_id,setInstaImageId ] = useState(null);
  const [ productInfo, setProductInfo ] = useState([]);
  const [ productDetails, setProductDetails ]  = useState([]);
  const [ dataLength, setDataLength ] = useState(8);
  const [ btnClass,setBtnClass ] = useState(true);
 
  const [ responseData, setResponseData ] = useState([]);
  const [ responseMasonryData, setResponseMasonryData ] = useState([]);
  const [ wrapperClass, setWrapperClass ] = useState('grid-wrapper');
  const [ column, setColumn ] = useState("4");
  const [ layout, setLayout ] = useState("grid");

  const [ page, setPage] = useState(1);
  const [ loading, setLoading ] = useState(true);
  const [ enabled, setEnabled ] = useState(false);
  // const [ layout, setLayout ] = useState("masonry"); // remove before build
  const [ mounted, setMounted ] = useState(false);
  let  shopDomain = document.querySelectorAll(".mst-slider")[block_index].querySelector("#shop-domain").getAttribute("data-shop_domain");
  // /*  remove before build   */
  // let ele =  document.querySelectorAll(".mst-slider")[block_index].querySelector("#shop-domain");
  // let shopDomain;
  // if(ele){
  //   shopDomain = document.querySelectorAll(".mst-slider")[block_index].querySelector("#shop-domain").getAttribute("data-shop_domain");
    /*  ----------*/
  // if(!shopDomain){
  //     shopDomain="futura-connect.myshopify.com";
  // }
  // }
  var index1= 0;
  const setData = (data) => {
      setResponseData(data);
  }
  const setData_new = (data) => {
     setResponseMasonryData((prev) => [...prev, ...data]);
     setLoading(false);
  }
  let limit = "10";
  let galleryId;
  var gallery_id = "";
  const formData = new FormData();

  const getCardData = async (formData) => {
     /* for paggination code below */ 
             axios({
                method: "post",
                url: ngrokUrl + "/api/getTaggedLists?shop=" + shopDomain +"&limit="+ limit + "&page="+page,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then((response) => {
                  setData_new(response.data)
                  if(response.data.length > 0 ){
                    setEnabled(true)
                  }else{
                    setEnabled(false);
                  }
                  setMounted(true);
            }).catch((error) => {
                console.log(error)
            })
  }
   useEffect(() => {
    galleryId = document.querySelectorAll(".mst-slider")[block_index].querySelector("#gallery-id");
    gallery_id   = galleryId.getAttribute("data-gallery_id")

    formData.append("gallery_id", gallery_id);
    formData.append("shop_domain", shopDomain);
    getCardData(formData);
  }, [page,responseData]);
    
    useEffect(() => {
        setColumn("");
        setLayout("");
        // let mstSlider = document.querySelectorAll(".mst-slider").length;
        galleryId = document.querySelectorAll(".mst-slider")[block_index].querySelector("#gallery-id");
        let blockLayout = document.querySelectorAll(".mst-slider")[block_index].querySelector(".mst_photo_gallery");
        let size = document.querySelectorAll(".mst-slider")[block_index].querySelector("#column-size");
        let limit_element = document.querySelectorAll(".mst-slider")[block_index].querySelector("#limit");
        var block_layout= "";
       
        var col_size= "4";
       
        block_layout = blockLayout.getAttribute("data-block_type");
        limit  = limit_element.getAttribute("data-image_limit");
        console.log("limit",limit)
        // block_layout = "masonry";  // remove before build code
        
        if(galleryId !== null && shopDomain !== null){
          gallery_id   = galleryId.getAttribute("data-gallery_id")
          if(block_layout !== 'masonry' && block_layout !== 'slider'){
            // if (Object.keys(size).length !== 0){
            col_size =  size.getAttribute("data-column_size");

            // }else{
            //   col_size= 4;
            // }
          }
        }
        setColumn(col_size);
        setLayout(block_layout);
       /* below two added */   
        formData.append("gallery_id", gallery_id);
        formData.append("shop_domain", shopDomain);
        axios({
                method: "post",
                url: ngrokUrl + "/api/getTaggedImages?shop=" + shopDomain,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then((response) => {
                setData(response.data)
                setMounted(true);
            }).catch((error) => {
                console.log(error)
            })
    }, [block_index,productDetails]);
 
 
  let responseData2 = responseData; //.slice(0,imgCount);
  function openModal(e,idx,insta_image_id) {
    console.log("Open modal")
    e.preventDefault();
    setModalIsOpen(true);
    document.body.classList.add('mst-sg-window-height');
    // setMounted(true);
    // console.log(idx);
    setIndex(idx);
    setInstaImageId(insta_image_id);
    getProductInfo(idx,insta_image_id);
  }

  function closeModal(e) {
    console.log("close modal")
    e.preventDefault();
    // setMounted(false);
    setModalIsOpen(false);
    document.body.classList.remove('mst-sg-window-height');
    setInstaImageId([]);
  }
  const previous = (index,insta_image_id) => {
    if (index > 0) {
      var idx = index - 1;
      setIndex(idx);
      getProductInfo(idx,insta_image_id);
    } else {
      return false;
    }
  }

  const next = (index,insta_image_id)=> {
    var instafeeds_len = responseData2.length - 1;
    if (index !== instafeeds_len) {
      var idx = index + 1;
      setIndex(idx);
      getProductInfo(idx,insta_image_id);
    } else {
      return false;
    }
  }
  const getProductInfo = useCallback((index,insta_image_id) =>{
    let prodcutIds = "";
    const formData = new FormData();
    responseData2.map((item,idx)=>{
      if(idx===index){
        var pData  = [];
         setProductInfo(item.products);
         item.products.map((p,index)=>{
            pData.push("gid://shopify/Product/"+p.product_id);
            prodcutIds = pData.join(', ');
         });
         formData.append("product_ids",prodcutIds);
         formData.append("shop_domain",shopDomain)
         axios({
              method: "post",
              url: ngrokUrl + "/api/getProductDetails?shop="+shopDomain,
              data:formData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
                console.log("before productDetails");
                setProductDetails(response.data) 
                console.log("after productDetails");
                // console.log("productDetails ImageGallery ",response.data)              
                // setMounted(true);
            }).catch((error) => {
              console.log(error)
            })
        
      }
    })
  });
  const loadMore = () =>{
    let length = responseData2.length;
    setDataLength(length);
    setBtnClass(false);
  }
 
  return(
    <>
    <section>
    {(() => {
        switch (layout) {
          case 'grid':
            return (<Grid key={index1+'-'+layout} enabled={enabled} setEnabled={setEnabled} id={index} block_index={block_index} loading={loading} setLoading={setLoading} page={page} setPage={setPage} index={index} responseData={responseMasonryData /*responseData2*/ } column={column} openModal={openModal} loadMore={loadMore} dataLength={dataLength} wrapperClass={wrapperClass} btnClass={btnClass} />);
            break;
          case 'masonry':
            return (<Masonry enabled={enabled} setEnabled={setEnabled} loading={loading} setLoading={setLoading} page={page} setPage={setPage}  index={index} block_index={block_index} responseData={responseMasonryData /*responseData2*/ } openModal={openModal} loadMore={loadMore} dataLength={dataLength} />)
            break;
          case 'slider':
            return(<SliderBox block_index={block_index} shopDomain={shopDomain} index={index} openModal={openModal}  responseData={responseMasonryData /*responseData2*/ } ngrokUrl={ngrokUrl} dataLength={dataLength} />);
            break;
          default:
            return (<Grid key={index1+'-'+layout}  index={index} responseData={responseMasonryData /*responseData2*/ } column={column} openModal={openModal} loadMore={loadMore} dataLength={dataLength} wrapperClass={wrapperClass} btnClass={btnClass} />)
        }
      })()}
    
    { modalIsOpen &&
     <ModalTagged 
          key={index}
          openModal ={openModal}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setModalIsOpen={setModalIsOpen}
          responseData={responseData2}
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
   }
  </section>  
  </>
    )
}
export default ImageGallery;