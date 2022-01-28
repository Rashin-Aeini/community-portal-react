import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { SERVER_URI } from "./Config";
import './HomePage.css';
import Post from "./Post";

const HomePage = () => {

    const [posts, setPosts] = useState([]);
    const [menus, setMenus] = useState([]);
    const [pages, setPages] = useState(0);

    const location = useLocation();

    const out = location.pathname.includes('admin') || location.pathname.includes('login');

    const parameters = useParams();

    useEffect(() => {
        if (!out) {
            axios({
                url: SERVER_URI + '/menu',
                method: "GET"
            }).then(function (response) {
                if (response.status == 200) {
                    setMenus(response.data)
                }
            });

            let page = 1;

            if (parameters.hasOwnProperty('number')) {
                page = parseInt(parameters.number);
            }

            let category = -1;

            if (parameters.hasOwnProperty('category')) {
                category = parseInt(parameters.category);
            }

            axios({
                url: SERVER_URI + '/?page=' + page + '&size=10&category=' + category,
                method: "GET"
            }).then(function (response) {
                if (response.status == 200) {
                    setPosts(response.data.posts);
                    setPages(response.data.pages);
                }
            });

        }
    }, [location]);

    return out ?
        (<Outlet />) :
        (
            <div>
                <div className="container">
                    <header className="blog-header py-3">
                        <div className="row flex-nowrap justify-content-between align-items-center">
                            <div className="col-4 pt-1">
                                <Link className="link-secondary" to="/">
                                    Subscribe
                                </Link>
                            </div>
                            <div className="col-4 text-center">
                                <Link className="blog-header-logo text-dark" to="/">
                                    Large
                                </Link>
                            </div>
                            <div className="col-4 d-flex justify-content-end align-items-center">
                                <a className="link-secondary" href="#" aria-label="Search">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5" /><path d="M21 21l-5.2-5.2" /></svg>
                                </a>
                                <Link className="btn btn-sm btn-outline-secondary" to="/admin/index">Sign up</Link>
                            </div>
                        </div>
                    </header>

                    <div className="nav-scroller py-1 mb-2">
                        <nav className="nav d-flex justify-content-between">
                            {menus.map(item => {
                                const address = '/category/' + item.id;

                                return (<Link className="p-2 link-secondary" to={address}>{item.title}</Link>);
                            })}
                        </nav>
                    </div>
                </div>

                <main className="container">
                    {posts.length != 0 ? posts.map(item => <Post entry={item} />) : (<p>There is nothing for showing</p>)}
                </main>
            </div>
        )
};

export default HomePage;