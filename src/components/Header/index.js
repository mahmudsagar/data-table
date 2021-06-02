import React, { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
const Header = ({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState(localStorage.getItem('order')? localStorage.getItem('order') : "asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order)
        localStorage.setItem('order', order)
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
                        {name}
                        {sortable && (
                            localStorage.getItem('order') === "desc" ? <BsArrowUp /> : <BsArrowDown/>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default Header;
