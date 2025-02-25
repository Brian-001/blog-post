import { Link } from "@inertiajs/react";


export default function Home({posts}){
    console.log(posts);
    return (
        <>
            <h1 className="text-blue-500 mt-10 flex items-center justify-center text-center">Hello</h1>
            {posts.map(post => (
                <div key={post.id} className="p-4 border-b border-gray-200">
                    <div className="text-sm text-slate-600">
                        <span>Posted on: </span>
                        <span>{ new Date(post.created_at).toLocaleTimeString() }</span>
                    </div>
                    <p className="font-medium">{post.body}</p>
                </div>
            ))}
            
        </>
    )
}

