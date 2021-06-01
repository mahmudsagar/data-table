import React, { useEffect, useMemo, useState } from 'react'
import { Container, Row, Table } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Pagination from "../Pagination";
import TableHeader from "../Header";
import PerPageItem from '../ItemPerPage';
import Search from '../Search';

const UserTable = () => {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(localStorage.getItem("currentPage" ) ? parseInt(localStorage.getItem("currentPage" )) : 1);
    const [itemPerPage, setItemPerPage] = useState(localStorage.getItem("itemPerPage" ) ? parseInt(localStorage.getItem("itemPerPage" )) : 50);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const handlefilter = (e)=>{
        e.preventDefault()
        localStorage.clear()
        window.location.reload();
    }
    useEffect(() => {
        const getData = () => {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => response.json())
                .then((json) => {
                    setComments(json);
                });
        };
        getData();
        setCurrentPage(localStorage.getItem("currentPage")? parseInt(localStorage.getItem("currentPage")) : 1)
        
    }, []);
    
    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Username", field: "username", sortable: false },
        { name: "Website", field: "website", sortable: false },
    ];

    const commentsData = useMemo(() => {
        let computedComments = comments;
        setTotalItems(comments.length);

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
              (a, b) => 
                reversed * a[sorting.field].localeCompare(b[sorting.field])
              );
        }

        if (search) {
            computedComments = computedComments.filter(
                (comment) =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase()) ||
                    comment.website.toLowerCase().includes(search.toLowerCase())
            );
            setTotalItems(computedComments.length);
        }
        return computedComments.slice(
            (currentPage - 1) * itemPerPage,
            (currentPage - 1) * itemPerPage + itemPerPage
        );
    }, [comments, currentPage, itemPerPage, search, sorting]);
    console.log(totalItems);
    return (
        <div>
            <Container className="py-3">
            <Row>
                <Col md={6}>
                    <Pagination
                        total={totalItems}
                        itemsPerPage={itemPerPage}
                        currentPage={currentPage}
                        onPageChange={(page) =>{
                            localStorage.setItem("currentPage", page)
                             setCurrentPage(page)
                            }}
                    />
                    <PerPageItem
                        onItemChange={(value) => {
                            setItemPerPage(parseInt(value));
                        }}
                    />
                </Col>
                <Col md={6} className="d-flex flex-row-reverse">
                    <Search
                        onSearch={(value) => {
                            setSearch(value);
                            setCurrentPage(1);
                            localStorage.setItem("currentPage", currentPage)
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Table striped>
                    <TableHeader
                        headers={headers}
                        onSorting={(field, order) =>
                            setSorting({ field, order })
                        }
                    />
                    <tbody>
                        {commentsData.map((comment, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row" className="text-center">
                                        {comment.id}
                                    </th>
                                    <td>{comment.name}</td>
                                    <td>{comment.email}</td>
                                    <td>{comment.username}</td>
                                    <td>{comment.website}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
        </div>
    )
}

export default UserTable
