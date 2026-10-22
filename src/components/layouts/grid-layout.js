import React,{ useState,useEffect } from 'react';
import './masonry.css';
import Loading from "../Loading";

const GridLayout = (props)=>{
	const { block_index,responseData,openModal,dataLength,column,enabled,setEnabled,loading, setLoading,page, setPage} = props;
                  
  var checkbox = document.querySelectorAll(".mst-slider")[block_index].querySelector("#fix-image-height").getAttribute("data-fix_height")
  var getHeight =   document.querySelectorAll(".mst-slider")[block_index].querySelector("#image-height").getAttribute("data-image_height")
  
  var height= parseInt(getHeight)
  var getPadding = document.querySelectorAll(".mst-slider")[block_index].querySelector("#padding").getAttribute("data-padding");

  var padding = parseInt(getPadding)
  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);
 
  const Gallery = ()=>{
    return( 
      <div className="sapp-gwrapper"> 
      <div className="sapp-gcontainer">
          <div className="row">
          { responseData.map((res,idx)=>{
            let displayImage= {
              backgroundImage:`url(${res.src})`,
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              display: 'block',
              backgroundRepeat: 'no-repeat, repeat',   
            }
            let galleryPhotos ={};

            (checkbox === "true") ?
            galleryPhotos={
                cursor: 'pointer',
                height: height,
                position: 'relative',
                width: '100%',
                padding:padding,
            }
            :
             galleryPhotos={
                cursor: 'pointer',
                // height: 395,
                // position: 'relative',
                width: '100%',
                // padding:padding,
            }
            return(<>
             {
               (enabled) &&
                (checkbox === "true") ?
                    <div className={"col-"+(12/column)} key={res.insta_image_id+ "-" +idx}>
                         <div style={galleryPhotos} >
                            <a style={displayImage} data-src={res.src} onClick={(e) => openModal(e,idx,res.insta_image_id)} ></a>
                          </div>
                    </div>
                 :
                    <div className={"col-"+(12/column)} key={res.insta_image_id+ "-" +idx}>
                      <div style={galleryPhotos} >
                        <a ><img key={res.title + "-" + idx} className="responsive-img" src={res.src} onClick={(e) => openModal(e,idx,res.insta_image_id)}  alt=""/></a>
                      </div>
                    </div>
                   
              }</>)
          })
          }                
        </div>
    </div>
    </div>)
  }

	return(
    <>
		<Gallery key="index"/>
    { enabled &&  loading ?
          <Loading />
        : <></> 
    }
    </>
		)
}
export default GridLayout;