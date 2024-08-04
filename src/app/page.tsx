'use client'

import Post from "@/components/post";
import postType from "@/types/post";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Home() {

    const [data, setData] = useState<Array<postType>>([]);
    
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('/api/data/posts');
            setData(response.data);
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
    
        fetchPosts();
      }, []);

    return (
        <div className="grid grid-cols-4 gap-20 auto-rows-auto p-20">
            {
                data.map((post: postType) => {
                    return (
                        <div key={post.id} className="h-fit">
                            <Post title={post.title} content={post.content} image={post.image}/>
                        </div>
                    )
                })
            }

        </div>
    )
}