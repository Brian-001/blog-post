import { useForm } from "@inertiajs/react"
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js";

export default function Edit({post}){

    const route = useRoute();
    const {data, setData, put, errors, processing} = useForm({
        body : post.body,
    });

    function submit (e) {

        e.preventDefault()
        // put(`/posts/${post.id}`);
        put(route('posts.update', post));
    }

    console.log(errors);

    return (
        <>
            <h1 className="text-blue-500 text-2xl font-bold mt-10 flex items-center justify-center text-center">Edit Posts</h1>
            
            <div className="w-3/4 md:w-1/2 ml-4  md:mx-auto mt-10">
                <form onSubmit={submit}> 
                    <div>
                        <textarea value={data.body} onChange={(e) => setData('body', e.target.value)}
                            className={`w-full h-32 border border-blue-600 focus:ring-blue-500 resize-none p-4 rounded-md 
                                ${errors.body ? "!border-red-500" : ""}`}
                        >{post.body} </textarea>
                        {errors.body && <p className="text-sm text-red-500 mt-2">{errors.body}</p>}
                        <button className="mt-4 bg-blue-400 py-2 px-4 rounded-md text-white cursor-pointer hover:bg-blue-500" disabled={processing}>Update Post</button>
                    </div>
                </form>
            </div>
        </>
    )
}