"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SigninForm() {

    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");

    const handleSubmit = async () => {
        
        const response = await signIn("credentials", {
            redirect: false,
            username,
            password,
          });
    }

    return (
        <div>
            <div className="flex flex-col justify-center">
                <input autoComplete={"false"} placeholder="JohnDoe" type="text" className="text-xl p-2 m-2 rounded-lg bg-slate-100 placeholder:text-lg placeholder:text-slate-500" onChange={(e) => {
                    setUsername(e.target.value)
                }}></input>                  
                <input autoComplete={"false"} placeholder="******" type="password" className="text-xl p-2 m-2 rounded-lg bg-slate-100 placeholder:text-lg placeholder:text-slate-500" onChange={(e) => {
                    setPass(e.target.value)
                }}></input>
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-center p-4">
                    <button onClick={handleSubmit} className="bg-blue-300 rounded-lg p-4 font-bold text-lg w-fit hover:bg-blue-800">Signin</button>
                </div>
            </div>
        </div>
    )
}