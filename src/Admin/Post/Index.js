import axios from "axios";
import React, { useState, useEffect } from "react";
import { SERVER_URI } from "../../Config";

export default function Index() {

    //Question
    const [sort, setSort] = useState('');
    const [type, setType] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    //Answer
    const [pages, setPages] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(SERVER_URI + '/post', {
            data: {
                'sort': sort,
                'type': type,
                'search': search,
                'page': page
            }
        }).then(function (response) {
            if (response.status == 200) {
                setPages(response.data.pages);
                setPosts(response.data.result);
            }
        });
    }, []);

    return (
        <div>
            
        </div>
    )
}