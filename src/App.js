import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "./App.css";
import TableHeader from "./components/Header";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import PerPageItem from "./components/ItemPerPage";

function App() {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(50);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    useEffect(() => {
        const getData = () => {
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => response.json())
                .then((json) => {
                    setComments(json);
                });
        };
        getData();
    }, []);
    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
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
        }
        return computedComments.slice(
            (currentPage - 1) * itemPerPage,
            (currentPage - 1) * itemPerPage + itemPerPage
        );
    }, [comments, currentPage, itemPerPage, search, sorting]);
    return (
        <Container className="py-3">
            <Row>
                <Col md={6}>
                    <Pagination
                        total={totalItems}
                        itemsPerPage={itemPerPage}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                    <PerPageItem
                        onItemChange={(value) => {
                            setItemPerPage(value);
                        }}
                    />
                </Col>
                <Col md={6} className="d-flex flex-row-reverse">
                    <Search
                        onSearch={(value) => {
                            setSearch(value);
                            setCurrentPage(1);
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
                                    <td>{comment.website}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default App;
