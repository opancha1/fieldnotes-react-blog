import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BlogPostsPage from './pages/BlogPostsPage.jsx';
import IndividualPostPage from './pages/IndividualPostPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

export default function App() {
  return <div className="site-shell"><Header /><Navbar /><Routes>
    <Route path="/" element={<BlogPostsPage />} />
    <Route path="/posts/:postId" element={<IndividualPostPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<IndividualPostPage />} />
  </Routes><Footer /></div>;
}
