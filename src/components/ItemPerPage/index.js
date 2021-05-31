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
            type="text"
            className="form-control"
            style={{ width: "240px" }}
            placeholder="Search"
            value={itemPerPage}
            onChange={(e)=> onChanging(e.target.value)}
        />
    );
}

export default PerPageItem
