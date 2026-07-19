import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Solutions } from './pages/Solutions';
import { SolutionDetails } from './pages/SolutionDetails';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { Blogs } from './pages/Blogs';
import { BlogDetails } from './pages/BlogDetails';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Industries } from './pages/Industries';
import { IndustryDetails } from './pages/IndustryDetails';
import { ClientsPartners } from './pages/ClientsPartners';
import { RequestQuote } from './pages/RequestQuote';
import { SearchPage } from './pages/Search';
import { ThankYou } from './pages/ThankYou';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionDetails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:id" element={<IndustryDetails />} />
          <Route path="/clients-partners" element={<ClientsPartners />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
