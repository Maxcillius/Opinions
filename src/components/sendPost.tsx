"use client"

import { useRef, useState } from "react"
import axios from "axios";
import { useSession } from "next-auth/react";

export default function SendPost() {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [alert, setAlert] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const session = useSession();

    const handleImageClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if(file.type.split("/")[0] == "image") {
                setSelectedImage(file);
                setAlert("");
            }
            else setAlert("Select only image");
        }
    }

    const handlePostUpload = async () => {

        if(title.length == 0 || content.length == 0) {
            if(title.length == 0) {
                setAlert("Title can't be empty")
            }
            if(content.length == 0) {
                setAlert("Content can't be empty")
            }
        } else {
            if(selectedImage != null) {
                const formData = new FormData();
                formData.append("image", selectedImage);
                formData.append('additionalData', JSON.stringify({ data: {
                    Title: title,
                    Content: content,
                } }));

                const response = await axios.post("/api/post/upload", formData,
                { headers: {
                    'Content-Type': 'multipart/form-data'
                }})

            }

        }
    }

    return (
        <div className="bg-slate-100 flex flex-col justify-center rounded-3xl">
            <div className="flex flex-row justify-center p-5">
                <input onChange={(e) => {
                    setTitle(e.target.value);
                }} maxLength={30} type="text" placeholder="Title" className="text-2xl p-2 font-bold focus:outline-none rounded-lg text-center focus:outline-blue-600"/>
            </div>
            { selectedImage == null &&
                <div className="flex flex-col justify-center h-52 bg-slate-300 mx-5 hover:cursor-pointer hover:bg-white" onClick={handleImageClick}>
                    <p className="text-center text-main font-bold">upload an image</p>
                </div>
            }
            <div className="flex flex-row justify-center">
                {
                    selectedImage && 
                    <div>
                        <img
                            alt="image"
                            width={"500px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <div className="font-bold text-lg flex flex-row justify-center p-2">
                            <p className="w-fit text-center bg-slate-200 p-2 rounded-lg hover:cursor-pointer hover:bg-slate-500 hover:text-white" onClick={handleImageClick}>Change Image?</p>
                        </div>
                    </div>
                }
            </div>
            {
                <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden"/>
            }
            <div className="font-bold text-xl text-center p-2 text-red-500">
                {alert}
            </div>
            <div className="flex flex-row justify-center p-5">
                <textarea onChange={(e) => {
                    setContent(e.target.value);
                }} maxLength={244} name="content" className="p-2 text-xl w-full h-40 focus:outline-blue-600 focus:outline-none resize-none"></textarea>
            </div>
            <div className="flex flex-row justify-center py-5">
                <button onClick={handlePostUpload} className="text-2xl font-bold p-5 rounded-lg bg-slate-300 text-black w-52 hover:bg-slate-200 hover:text-white">Send</button>
            </div>
        </div>
    )
}