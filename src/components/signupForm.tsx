"use client"

import { useState } from "react";
import axios from 'axios';
import User from "@/types/user";

export default function SignupForm() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState("");

    const body: User = {
        name: name,
        username: username,
        password: pass,
        confirmpassword: confirmPassword,
        email: email,
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const response = await axios.post("/auth/signup", body);

        if(!response) {
            setAlert("Some error with backend");
        } else {
            setAlert("Account successfully created");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-centers">
                <div className="font-bold text-lg text-center">
                    {alert}
                </div>
                <div className="flex flex-col justify-center">
                    <input autoComplete={"false"} placeholder="John Doe" type="text" className="text-xl p-2 m-2 rounded-lg bg-slate-100 placeholder:text-lg placeholder:text-slate-500" onChange={(e) => {
                        setName(e.target.value)
                    }}></input>
                    <input autoComplete={"false"} placeholder="johndoe_slayer" type="text" className="text-xl p-2 m-2 rounded-lg bg-slate-100 placeholder:text-lg placeholder:text-slate-500" onChange={(e) => {
                        setUsername(e.target.value)
                    }}></input>
                    <input autoComplete={"false"} placeholder="******" type="password" className="text-xl p-2 m-2 rounded-lg bg-slate-100 placeholder:text-lg placeholder:text-slate-500" onChange={(e) => {
                        setPass(e.target.value)
                    }}></input>
                                        <input autoComplete={"false"} placeholder="******" type="password" className="text-xl p-2 m-2 rounded-lg bg-slate-100 placeholder:text-lg placeholder:text-slate-500" onChange={(e) => {
                        setconfirmPassword(e.target.value)
                    }}></input>
                    <input autoComplete={"false"} placeholder="johndoe@email.com" type="text" className="text-xl p-2 m-2 rounded-lg bg-slate-100 placeholder:text-lg placeholder:text-slate-500" onChange={(e) => {
                        setEmail(e.target.value)
                    }}></input>
                </div>
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row justify-center p-4">
                        <button type={"submit"} className="bg-blue-300 rounded-lg p-4 font-bold text-lg w-fit hover:bg-blue-800">Signin</button>
                    </div>
                </div>
            </form>
        </div>
    )
}