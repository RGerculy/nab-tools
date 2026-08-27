import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './components/Home';
import ToolPage from './components/ToolPage';
import { Privacy, About, NotFound } from './components/StaticPages';
import { Blog } from './components/Blog';
import { BlogPost } from './components/BlogPost';
import { Tos } from './components/Tos';
import { BLOG_ENABLED } from './config';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tools/:slug" element={<ToolPage />} />
        {BLOG_ENABLED && <Route path="/blog" element={<Blog />} />}
        {BLOG_ENABLED && <Route path="/blog/:slug" element={<BlogPost />} />}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  );
}
