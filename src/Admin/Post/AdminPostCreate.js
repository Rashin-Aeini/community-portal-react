import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SERVER_URI } from "../../Config";

const AdminPostCreate = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    const sendDataToServer = (data) => {
        //
    }

    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        axios({
            method: "GET",
            url: SERVER_URI + '/category?size=-1'
        }).then(function(response){
            if(response.status === 200){
                setCategories(response.data.result);
            }
        })
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Create new post</h1>
            </div>
            <form onSubmit={handleSubmit(sendDataToServer)}>
                <div class="mb-3">
                    <label class="form-label" for="title">Title</label>
                    <input class="form-control" type="text" {...register("title")} />
                        <span class="text-danger" asp-validation-for="Title"></span>
                </div>
                <div class="mb-3">
                    <label for="thumbnail" class="form-label">Thumbnail</label>
                    <input class="form-control" type="text" {...register("thumbnail")} />
                        <span class="text-danger" asp-validation-for="Thumbnail"></span>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <textarea class="form-control" {...register("content")}></textarea>
                    <span class="text-danger" asp-validation-for="Content"></span>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AdminPostCreate;