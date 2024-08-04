"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function DropDown() {

    const { data: session, status, update } = useSession();

    return (
       <div className="absolute m-3">
            { status === 'authenticated' &&
                <div className="bg-slate-200 flex flex-col justify-center w-fit rounded-lg">
                    <div className="flex flex-col justify-center p-4 gap-5 w-52">
                        <Link href={"/post/user/" + session?.user?.name}><p className="text-center text-main text-lg font-bold p-4 hover:cursor-pointer hover:bg-slate-300">Send a post</p></Link>
                        <p className="text-center text-white text-lg font-bold p-4 bg-blue-600 rounded-lg hover:cursor-pointer hover:bg-blue-500" onClick={() => {
                            signOut();
                        }}>Signout</p>

                    </div>
                </div>
            }
            {
                status === 'unauthenticated' && 
                <div className="bg-slate-200 flex flex-col justify-center w-fit rounded-lg">
                <div className="flex flex-col justify-center p-4 gap-5 w-52">
                    <Link href={"/user/signup"}><p className="text-center text-main text-lg font-bold p-4 hover:cursor-pointer hover:bg-slate-300">Signup</p></Link>
                    <Link href={"/api/auth/signin"} className="text-center text-white text-lg font-bold p-4 bg-blue-600 rounded-lg hover:cursor-pointer hover:bg-blue-500">Login</Link>

                </div>
            </div>
            }
       </div>
    )
}