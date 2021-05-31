import React, { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
const Header = ({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order)
        onSorting(field, order)
    };

    return (
        <thead className="text-center">
            <tr>
                {headers.map(({ name, field, sortable }, index) => (
                    <th
                        key={index}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {console.log(field)}
                        {name}
                        {sortingField && sortingField === field && (
                            sortingOrder === "asc" ? <BsArrowDown/> : <BsArrowUp />
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default Header;
