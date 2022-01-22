import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import { SERVER_URI } from "../../Config";

const AdminPostIndex = () => {

    //Question
    const [sort, setSort] = useState('');
    const [type, setType] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    //Answer
    const [pages, setPages] = useState(0);
    const [posts, setPosts] = useState([]);

    const location = useLocation(); // get browser address

    const navigate = useNavigate();

    const child = location.pathname.split('/').length == 4; // checking browser address for showing sub route

    const fetchFromServer = () => {
        // if is sub route not fetching from server 
        if (!child) {
            axios({
                url: SERVER_URI + '/post?page=' + page + '&search=' + search + '&sort=' + sort + '&type=' + type,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response.status == 200) {
                    setPages(response.data.pages);
                    setPosts(response.data.result);
                }
            });
        }

    };

    useEffect(fetchFromServer, []);
    useEffect(fetchFromServer, [sort, type, search, page, location]);

    const deleteFromServer = (event) => {
        const id = parseInt(event.target.value);
        axios({
            url: SERVER_URI + '/post/' + id,
            method: 'DELETE'
        }).then(function(response){
            if(response.status == 200){
                navigate('/admin/post');
            }
        })
    }

    //show outlet for sub route or table for main route
    return child ? (<Outlet />) : (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Show all posts</h1>
            </div>
            <div className="table-responsible">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.length != 0 ?
                                (
                                    posts.map(item => {
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>
                                                    <Link
                                                        className="btn btn-link text-decoration-none text-info"
                                                        to={`/admin/post/${item.id}`}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button className="btn btn-link text-decoration-none text-danger"
                                                    onClick={deleteFromServer} value={item.id}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) :
                                (
                                    <tr>
                                        <td colSpan={3}>There is nothing to show</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )


}

export default AdminPostIndex;