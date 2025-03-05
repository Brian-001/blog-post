import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useState } from "react";


export default function Home({posts}){
    
    const route = useRoute();
    const {flash} = usePage().props;
    const {component} = usePage();

    const [flashMsg, setFlashMsg] = useState(flash.message);  
    
    setTimeout(() => {
        setFlashMsg(null)
    }, 2000);

    return (
        <>
            <Head title={component} />
            <h1 className="text-blue-500 text-2xl font-bold mt-10 flex items-center justify-center text-center">Hello</h1>
            {flashMsg && <div className="absolute top-24 right-6 bg-red-500 p-2 rounded-md shadow-lg text-sm text-white">{flashMsg}</div>}
            {posts.data.map(post => (
                <div key={post.id} className="p-4 border-b border-gray-200">
                    <div className="text-sm text-slate-600">
                        <span>Posted on: </span>
                        <span>{ new Date(post.created_at).toLocaleTimeString() }</span>
                    </div>
                    <p className="font-medium mb-2">{post.body}</p>
                    {/* <Link href={`/posts/${post.id}`} className="text-white bg-blue-400 py-2 px-4 rounded-md mt-2">Read More..</Link> */}
                    <Link href={route('posts.show', post)} className="text-white bg-blue-400 py-2 px-4 rounded-md mt-2">Read More..</Link>
                </div>
            ))}

            <div className="py-12 px-4">
                {posts.links.map((link, index) =>(
                    link.url ?
                    <Link
                        key={index}
                        href={link.url}
                        dangerouslySetInnerHTML={{__html: link.label}}
                        className={`p-1 mx-1 ${link.active ? "text-blue-500 font-bold" : ""}`}
                    />
                    :
                    <span
                        key={index}
                        dangerouslySetInnerHTML={{__html: link.label}}
                        className="px-1 mx-1 text-slate-300"
                    >
                    </span>
                ))}
            </div>
            
        </>
    )
}

