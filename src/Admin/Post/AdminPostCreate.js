import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SERVER_URI } from "../../Config";

const AdminPostCreate = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();

    const sendDataToServer = async (formData) => {
        if (
            formData.hasOwnProperty('categories') &&
            formData.categories instanceof Array &&
            formData.categories.length != 0
        ) {
            formData.categories = formData.categories.map(item => parseInt(item));
        }

        const response = await axios({
            url: SERVER_URI + '/post',
            method: "POST",
            data: formData
        });
        
        if (response.status == 200) {
            navigate('/admin/post');
        }
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: SERVER_URI + '/category?size=-1'
        }).then(function (response) {
            if (response.status === 200) {
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
                <div className="mb-3">
                    <label className="form-label" for="title">Title</label>
                    <input className="form-control" type="text" {...register("title", { required: true })} />
                    {errors.title?.type === "required" && (<span className="text-danger">The title is required field</span>)}
                </div>
                <div className="mb-3">
                    <label for="thumbnail" className="form-label">Thumbnail</label>
                    <input className="form-control" type="text" {...register("thumbnail")} />
                    <span className="text-danger" asp-validation-for="Thumbnail"></span>
                </div>
                <div className="mb-3">
                    <label for="content" className="form-label">Content</label>
                    <textarea className="form-control" {...register("content", { required: true })}></textarea>
                    {errors.content?.type === "required" && (<span className="text-danger">The content is required field</span>)}
                </div>
                {
                    categories.map((item, index) => {

                        const divKey = `checkbox-${index}`; // string.format("checkbox-{0}", index)
                        const inputId = `checkbox-${item.id}`;

                        // Id => id
                        // FirstName => firstName

                        return (
                            <div className="form-check mb-3" key={divKey}>
                                <input className="form-check-input" type="checkbox" value={item.id} id={inputId} {...register("categories[]")} />
                                <label className="form-check-label" for={inputId}>
                                    {item.title}
                                </label>
                            </div>
                        )
                    })
                }
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AdminPostCreate;