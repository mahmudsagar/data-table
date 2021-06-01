import React, { useEffect, useState } from "react";

const PerPageItem = ({ onItemChange }) => {
    const [itemPerPage, setItemPerPage] = useState(
        localStorage.getItem("itemPerPage")
            ? localStorage.getItem("itemPerPage")
            : ""
    );

    const onChanging = (value) => {
        setItemPerPage(value);
        localStorage.setItem("itemPerPage", value);
        onItemChange(value ? value : 50);
    };
    useEffect(() => {
        onItemChange(
            localStorage.getItem("itemPerPage")
                ? localStorage.getItem("itemPerPage")
                : 50
        );
    }, []);
    return (
        <input
            type="number"
            className="form-control"
            style={{ width: "240px" }}
            placeholder="set number"
            value={itemPerPage}
            min="1"
            onChange={(e) => onChanging(e.target.value)}
        />
    );
};

export default PerPageItem;
