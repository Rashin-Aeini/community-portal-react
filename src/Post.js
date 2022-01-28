import React from "react";
import { Link } from "react-router-dom";

const Post = ({ entry }) => {
    return (
        <div className="col-md-6">
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                    {entry.categories.map(category => {
                        const address = '/category/' + category.id;
                        return (
                            <Link className="d-inline-block mb-2 text-primary" to={address}>{category.title}</Link>
                        )
                    })}
                    <h3 className="mb-0">{entry.title}</h3>
                    <p className="card-text mb-auto">{entry.content}</p>
                </div>
                <div className="col-auto d-none d-lg-block">
                    <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c" />
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                    </svg>

                </div>
            </div>
        </div>
    );
};

export default Post;