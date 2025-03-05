import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import Layout from '@/Layouts/Layout';

createInertiaApp({
  title: (title) => 
    title ? `${title} - Laravel Inertia React` : "Laravel Inertia React",
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    let page =  pages[`./Pages/${name}.jsx`];
    
    //Checks if a page has existing layout and if it doesn't it should use this defined one
    page.default.layout = page.default.layout || ((page) => <Layout children={page}/>);
    return page;
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
  progress: {
    color: '#fff',
    showSpinner: true,
  },
})