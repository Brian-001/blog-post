export default function Show({post}){
    return (
        <>
            <div  className="p-4 border-b border-gray-200">
                <div className="text-sm text-slate-600">
                    <span>Posted on: </span>
                    <span>{ new Date(post.created_at).toLocaleTimeString() }</span>
                </div>
                <p className="font-medium mb-2">{post.body}</p>
            </div>
        </>
    )
}