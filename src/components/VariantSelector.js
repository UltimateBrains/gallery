const VariantSelector =(props)=>{
  const { option,handleOptionChange,index} = props;
  return(
       <div className="variant-col" key={index}>
          <div className="variant-col-t">
            <span className="variant-title">{ option.name }</span>
          </div>
        <div className="variant-col">
          <select className="variant-option"
            name={option.name}
            key={option.name}
            onChange={handleOptionChange}>
            {option.values.map((value) => {
              return (         
                <option value={value} key={`${option.name}-${value}`}>{`${value}`}</option>
              )
            })}
          </select>
        </div>
      </div>
    )
}
export default VariantSelector;
