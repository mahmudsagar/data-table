import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Postlist from "../PostList";
import UserInfo from "../UserInfo";

const UserDashboard = () => {
    const [user, setUser] = useState({});
    const [userPost, setUserPost] = useState([])
    // @ts-ignore
    const { id } = useParams();
    const getUser = async () => {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const result = await response.json();
        setUser(result);
    };
    const getPosts = async()=>{
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}/posts`
        );
        const result = await response.json();
        setUserPost(result); 
    }
    useEffect(() => {
        getUser()
    }, []);
    return (
        <div>
            <UserInfo  user={user}/>
            <Postlist post={userPost} />
        </div>
    );
};

export default UserDashboard;
