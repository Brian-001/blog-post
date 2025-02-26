# Creating Laravel React App

In this project we are going to use laravel, react and inertia

`Laravel` will serve as a `backend` framework whereas `react` will serve as `frontend` framework.

`Inertia` is the glue that holds laravel and react.

## Steps

Create a laravel App

```bash
composer global require laravel/installer
```

```bash
laravel new blog-post
```

Install React and react-dom
```bash
npm i react react-dom
```

Install vite plugin-react to build your react app

```bash
npm install --save-dev @vitejs/plugin-react
```

Install Inertiajs `server-side`

```bash
composer require inertiajs/inertia-laravel
```

Create a root file called `app.blade.php`. Inside it have the following:

```php
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>
```

Setup Inertia middleware

```bash
php artisan inertia:middleware
```
Once inertia middleware has been published, append `HandleInertiaRequests` middleware to the `web` middleware group in `bootstrap/app.php`

```php
use App\Http\Middleware\HandleInertiaRequests;

->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        HandleInertiaRequests::class,
    ]);
})
```

Install react `client-side`

```bash
npm install @inertiajs/react
```

In `resources/js/app.js` copy the following:
```jsx
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
```

Rename `resources/js/app.js` to `resources/js/app.jsx`

Import react-plugin from the react plugin that we already installed in `vite.config.js`

```js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input:  'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});

```

Inside `views` directory create home component: `Home.jsx`

```jsx
export default function Home(){
    return (
        <>
            <h1>Hello User. My name is Brian and I love React</h1>
        </>
    )
}
```

In `web.php`

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Home');
});
```

Let's serve our application by running:

```bash
php artisan serve
```
```bash
npm run dev
```

Import tailwind css in the main jsx file which is `app.jsx`

```jsx
import '..css/app.css'
```

## Something to Note

Suppose you encounter the following error in your .jsx file:

`Each child in a list should have a unique 'key' prop `

Let's say that your Home.jsx file was like this:

```jsx
import { Link } from "@inertiajs/react";


export default function Home({posts}){
    
    return (
        <>
            <h1 className="text-blue-500 text-2xl font-bold mt-10 flex items-center justify-center text-center">Hello</h1>
            {posts.data.map(post => (
                <div key={post.id} className="p-4 border-b border-gray-200">
                    <div className="text-sm text-slate-600">
                        <span>Posted on: </span>
                        <span>{ new Date(post.created_at).toLocaleTimeString() }</span>
                    </div>
                    <p className="font-medium">{post.body}</p>
                </div>
            ))}

            <div className="py-12 px-4">
                {posts.links.map((link) =>(
                    link.url ?
                    <Link
                        key={link.key}
                        href={link.url}
                        dangerouslySetInnerHTML={{__html: link.label}}
                        className={`p-1 mx-1 ${link.active ? "text-blue-500 font-bold" : ""}`}
                    />
                    :
                    <span
                        key={link.key}
                        dangerouslySetInnerHTML={{__html: link.label}}
                        className="px-1 mx-1 text-slate-300"
                    >

                    </span>
                ))}
            </div>
            
        </>
    )
}


```

The error occurs because `React` requires a unique key prop for each element in a list.

For pagination links `link.key` is the `key`. However, it might not be unique. We use `index` as the key because it is unique for each item in the list.

React uses props to:

<ul>
  <li>Identify which items have changed, been added or been removed</li>
  <li>Optimize re-rendering by re-using existing DOM elements</li>
</ul>