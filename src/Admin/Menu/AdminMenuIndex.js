import axios from "axios";
import React, { useState, useEffect } from "react";
import { SERVER_URI } from "../../Config";
import { useUser } from "../../UserContext";

const AdminMenuIndex = () => {
    //

    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);

    const { user } = useUser();

    useEffect(async () => {
        let response = await axios({
            url: SERVER_URI + '/category?size=-1',
            method: "GET"
        });

        if (response.status == 200) {
            setCategories(response.data.result)
        }

        response = await axios({
            url: SERVER_URI + '/menu',
            method: "GET"
        });

        if (response.status == 200) {
            setMenus(response.data);
        }

    }, []);

    const addToMenu = (event) => {
        axios({
            url: SERVER_URI + '/menu?id=' + parseInt(event.target.value),
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + user.token
            }
        }).then(function (response) {
            if (response.status == 200) {
                let content = menus.filter(item => true);
                content.push(response.data);
                setMenus(content);
            }
        })
    };

    const deleteFromMenu = (event) => {
        axios({
            url: SERVER_URI + '/menu/' + parseInt(event.target.value),
            method: "DELETE",
            headers: {
                'authentication': 'ahad:1234'
            }
        }).then(function (response) {
            if (response.status == 200) {
                let content = menus.filter(item => item.id != parseInt(event.target.value));
                setMenus(content);
            }
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Show all menus</h1>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-between">
                    <div className="col-5">
                        <div className="table-responsive">
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
                                        categories.length != 0 ?
                                            (
                                                categories.filter(item => {
                                                    return menus.filter(menu => { return menu.id == item.id }).length == 0
                                                })
                                                    .map(item => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td>{item.id}</td>
                                                                <td>{item.title}</td>
                                                                <td>
                                                                    <button value={item.id} className="btn btn-link text-success text-decoration-none" onClick={addToMenu}>
                                                                        Add
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
                    <div className="col-5">
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
                                        menus.length != 0 ?
                                            (
                                                menus.map(item => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.title}</td>
                                                            <td>
                                                                <button value={item.id} className="btn btn-link text-danger text-decoration-none" onClick={deleteFromMenu}>
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
                </div>
            </div>
        </div>
    )
}

export default AdminMenuIndex;