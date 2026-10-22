import React,{ useState,useEffect } from 'react';
import Masonry from 'react-masonry-css';
import './masonry.css';
import Loading from "../Loading";

const MasonryLayout = (props)=>{
  const { responseData,openModal,loading, setLoading,page, setPage,enabled,setEnabled } = props;
  const breakpointColumnsObj = {
      default: 4,
      1100: 4,
      700: 2,
      500: 1
    };
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
  
  var itemsData = {};
  itemsData = responseData.map((item,index)=>{
        return(<img  width="100%" id={index} src={item.src} onClick={(e) => openModal(e,index,item.insta_image_id)} alt="" />)
  });
  
  let lengthData =  responseData.length;
  return(
    <>  
       <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        > 
      {itemsData}
      </Masonry>
       { enabled &&  loading ?
          <Loading />
        : <></> 
        }
    </>)
}
export default MasonryLayout;


