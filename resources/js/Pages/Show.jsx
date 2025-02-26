import { useForm } from "@inertiajs/react"
import { route, useRoute } from "../../../vendor/tightenco/ziggy";

export default function Show({post}){

    const {delete: destroy} = useForm();
    function submit(e) {

        e.preventDefault();
        // destroy(`/posts/${post.id}`);
        destroy(route('posts.destroy', post));
    }
    return (
        <>
            <div  className="p-4 border-b border-gray-200">
                <div className="text-sm text-slate-600">
                    <span>Posted on: </span>
                    <span>{ new Date(post.created_at).toLocaleTimeString() }</span>
                </div>
                <p className="font-medium mb-2">{post.body}</p>

                <div className="flex items-center justify-end gap-2">
                    <form onSubmit={submit}>
                        <button className="bg-red-400 py-2 px-4 rounded-md text-white cursor-pointer hover:bg-red-500" >Delete</button>
                    </form>
                </div>
            </div>
        </>
    )
}