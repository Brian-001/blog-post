import { children } from "react";

export default function Layout({children}){
    return (
        <>
            <header className="bg-slate-700 h-20">
                <nav className="flex items-center justify-between h-16 mx-20">
                    <a className="text-white py-2 px-4 bg-slate-500 hover:bg-slate-600 rounded-md" href="/">Home</a>
                    <a className="text-white py-2 px-4 bg-slate-500 hover:bg-slate-600 rounded-md" href="/create">Create</a>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}

