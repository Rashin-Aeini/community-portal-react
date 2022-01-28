import React, { useContext, useEffect } from 'react';
import './Dashboard.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URI } from '../Config';
import { useUser } from '../UserContext';

export default function Dashboard(props) {
    const { user } = useUser();
    const navigate = useNavigate();

    console.log(user);

    useEffect(() => {
        let body = document.querySelector('body');

        if(body != undefined){
            body.classList.remove("login");
        }

        if (user.token != '') {
            axios({
                url: SERVER_URI + '/token?number=' + user.token,
                method: "POST"
            }).then(function (response) {
                if (response.status == 400) {
                    navigate('/login');
                }
            });
        } else {
            navigate('/login');
        }
    }, [])
    return (
        <div>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">Company name</Link>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3" href="#">Sign out</a>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky p-3">
                            <ul className="list-unstyled ps-0">
                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                                        <i className="bi bi-pin-fill"></i>
                                        Dashboard
                                    </button>
                                    <div className="collapse" id="home-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li>
                                                <Link
                                                    to="/admin/index"
                                                    className="link-dark rounded">
                                                    Overview
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="mb-1">
                                    <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#post-collapse" aria-expanded="false">
                                        Post
                                    </button>
                                    <div className="collapse" id="post-collapse">
                                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li>
                                                <Link to="/admin/post"
                                                    className="link-dark rounded">
                                                    All posts
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/post/create"
                                                    className="link-dark rounded">
                                                    Add new
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/admin/category"
                                                    className="link-dark rounded">
                                                    Categories
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="mb-1" style={{ fontWeight: '600', padding: '0.25rem 0.5rem', textDecoration: 'none' }}>
                                    <Link
                                        to="/admin/menu"
                                        className="link-dark rounded text-decoration-none">
                                        Menus
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}