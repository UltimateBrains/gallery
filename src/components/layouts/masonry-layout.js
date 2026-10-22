import './masonry.css';
const MasonryLayout = (props)=>{
	const { responseData,openModal,loadMore,dataLength,wrapperclassName,btnclassName} = props;
	return(
		<>
    <div className="masonry-container">
      {responseData.map((res,idx)=>{
       return(<>
        {
        (dataLength >= idx) &&
         <div className="masonry-item" key={idx}>
            <img src={res.src} onClick={(e) => openModal(e,idx,res.insta_image_id)} alt="" />
        </div>
        }
          </>)
      })}
   
    </div>
		</>)
}
export default MasonryLayout;

