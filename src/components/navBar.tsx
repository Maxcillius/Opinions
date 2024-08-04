"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import DropDown from "./dropDown"
import { useState } from "react"

export default function Navbar() {

    const { data: session, status, update } = useSession();
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="fixed-top h-fit bg-slate-200 m-3 rounded-xl">
            <div className="grid grid-cols-2 grid-rows-1">
                <div className="flex flex-row gap-20">
                    <Link href={"/"}>
                        <Image src={"/icon.svg"} alt="icon" width={70} height={70} className="m-2 ml-4"></Image>
                    </Link>
                </div>
                <div className="flex flex-row justify-end">
                    {status === "unauthenticated" &&
                        <div onClick={() => {setOpen(!isOpen)}} className="text-center text-xl flex flex-col justify-center px-5 text-main font-bold">
                            <div className="flex-row flex justify-center sm:px-10 py-3 rounded-xl hover:cursor-pointer hover:bg-slate-300 gap-2">
                                <Image src={"/user.svg"} alt="user" width={30} height={30}></Image>
                                <p className="flex flex-col justify-center sm:visible collapse">Account</p>
                            </div>
                        </div>
                    }
                    {
                        status === 'authenticated' &&
                        <div className="text-center text-xl flex flex-col justify-center px-5 text-main font-bold" onClick={() => {
                            setOpen(!isOpen);
                        }}>
                            <div className="flex-row flex justify-center sm:px-10 py-3 rounded-xl hover:cursor-pointer hover:bg-slate-300 gap-2">
                                <Image src={"/user.svg"} alt="user" width={30} height={30}></Image>
                                <p className="flex flex-col justify-center sm:visible collapse">{session.user?.name?.toUpperCase()}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="flex flex-row justify-end">
                {isOpen &&  <DropDown/>}
            </div>
        </div>
    )
}