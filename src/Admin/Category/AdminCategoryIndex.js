import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "../../Config";
import { useForm } from "react-hook-form";

const AdminCategoryIndex = () => {

    const [search, setSearch] = useState("");
    const [size, setSize] = useState(10);
    const [page, setPage] = useState(1);

    const [pages, setPages] = useState(0);
    const [categories, setCategories] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const [flag, setFlag] = useState(false);
    const [id, setId] = useState(0);

    const { register, formState: {errors}, handleSubmit, setValue } = useForm();

    const fetchDataFromServer = () => {
        axios({
            url: SERVER_URI + '/category?search=' + search + '&size=' + size + '&page=' + page,
            method: "GET",
        }).then(function (response) {
            if (response.status == 200) {
                setPages(response.data.pages);
                setCategories(response.data.result);
            }
        })
    };

    const sendDataToServer = (formData) => {
        let url = SERVER_URI + '/category';

        if(flag && id != 0){
            url = url + '/' + id;
        }

        axios({
            url: url,
            method: "POST",
            data: formData
        }).then(function(response){
            if(response.status == 200){
                setRefresh(!refresh);

                //Restarting form to default duty
                setFlag(false);
                setId(0);

                setValue('title', '');
            }
        });
    };

    const changeToUpdate = (event) => {
        const value = parseInt(event.target.value);

        categories.forEach(item => {
            if(item.id == value){
                setId(value);
                setFlag(true);
                setValue('title', item.title);
            }
        });
    }

    const deleteFromServer = (event) => {
        
        const id = parseInt(event.target.value);

        axios({
            url: SERVER_URI + '/category/' + id,
            method: "DELETE"
        }).then(function(response){
            if(response.status == 200){
                setRefresh(!refresh);
            }
        });
    };

    

    useEffect(fetchDataFromServer, []);
    useEffect(fetchDataFromServer, [search, page, size, refresh]);

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Show all categories</h1>
            </div>
            <div className="container-fluid">
                <div className="row justify-content-between">
                    <div className="col-3">
                        <form onSubmit={handleSubmit(sendDataToServer)}>
                            <div className="mb-3">
                                <label className="form-label" for="title">Title</label>
                                <input className="form-control" type="text" {...register("title", { required: true })} />
                                {errors.title?.type === "required" && (<span className="text-danger">The title is required field</span>)}
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="col-8">
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
                                        categories.length != 0 ?
                                            (
                                                categories.map(item => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.title}</td>
                                                            <td>
                                                                <button value={item.id} className="btn btn-link text-danger text-decoration-none" onClick={deleteFromServer}>
                                                                    Delete
                                                                </button>
                                                                <button value={item.id} className="btn btn-link text-info text-decoration-none" onClick={changeToUpdate}>
                                                                    Update
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
    );
}

export default AdminCategoryIndex;