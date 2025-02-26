import { useForm } from "@inertiajs/react"

export default function Create(){

    const {data, setData, post, errors, processing} = useForm({
        body : "",
    });

    function submit (e) {

        e.preventDefault()
        post("/posts");
    }

    console.log(errors);

    return (
        <>
            <h1 className="text-blue-500 text-2xl font-bold mt-10 flex items-center justify-center text-center">Create Posts</h1>
            
            <div className="w-3/4 md:w-1/2 ml-4  md:mx-auto mt-10">
                <form onSubmit={submit}> 
                    <div>
                        <textarea value={data.body} onChange={(e) => setData('body', e.target.value)}
                            className={`w-full h-32 border border-blue-600 focus:ring-blue-500 resize-none p-4 rounded-md 
                                ${errors.body ? "!border-red-500" : ""}`}
                            placeholder="Write your post here..."
                        ></textarea>
                        {errors.body && <p className="text-sm text-red-500 mt-2">{errors.body}</p>}
                        <button className="mt-4 bg-blue-400 py-2 px-4 rounded-md text-white cursor-pointer hover:bg-blue-500" disabled={processing}>Create Post</button>
                    </div>
                </form>
            </div>
        </>
    )
}