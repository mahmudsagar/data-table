import React, { useState } from 'react'

const PerPageItem = ({onItemChange}) => {
    const [itemPerPage, setItemPerPage] = useState('')

    const onChanging=(value)=>{
        setItemPerPage(value)
        console.log(value)
        if(value<0 || null || undefined){
            onItemChange(50)
        }else
            onItemChange(value)
    }
    return (
        <input
            type="number"
            className="form-control"
            style={{ width: "240px" }}
            placeholder="set number"
            value={itemPerPage}
            onChange={(e)=> onChanging(e.target.value)}
        />
    );
}

export default PerPageItem
