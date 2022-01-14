import React from 'react';
import './Dashboard.css';
import { Outlet } from 'react-router-dom';

export default function Dashboard(props) {
    return (
        <div>
            <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
                <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-nav">
                    <div class="nav-item text-nowrap">
                        <a class="nav-link px-3" href="#">Sign out</a>
                    </div>
                </div>
            </header>

            <div class="container-fluid">
                <div class="row">
                    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div class="position-sticky p-3">
                            <ul class="list-unstyled ps-0">
                                <li class="mb-1">
                                    <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                                        <i class="bi bi-pin-fill"></i>
                                        Dashboard
                                    </button>
                                    <div class="collapse" id="home-collapse">
                                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li>
                                                <a
                                                    href="#"
                                                    class="link-dark rounded">
                                                    Overview
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="mb-1">
                                    <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#post-collapse" aria-expanded="false">
                                        Post
                                    </button>
                                    <div class="collapse" id="post-collapse">
                                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                            <li>
                                                <a href="#"
                                                    class="link-dark rounded">
                                                    All posts
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    class="link-dark rounded">
                                                    Add new
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    class="link-dark rounded">
                                                    Categories
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    )
}