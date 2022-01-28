import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SERVER_URI } from "../Config";
import { useUser } from "../UserContext";
import "./login.css";

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const navigate = useNavigate();

    const { setUser } = useUser();

    useEffect(() => {
        let body = document.querySelector('body');
        if(body != undefined){
            body.classList.add("login");
        }
    }, [])

    const sendDataToServer = (formData) => {
        axios({
            url: SERVER_URI + '/account',
            method: "POST",
            data: formData
        }).then(function (response) {
            if (response.status == 200) {
                setUser(response.data);
                navigate('/admin/index');
            }
        })
    };

    return (
        <div className="text-center">
            <main className="form-signin">
                <form onSubmit={handleSubmit(sendDataToServer)}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Username" {...register("username", { required: true })} />
                        <label for="floatingInput">Username</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" {...register("password", { required: true })} />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </main>
        </div>
    )
};

export default Login;