import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Tag, 
  Clock, 
  Inbox, 
  SlidersHorizontal,
  X,
  BookOpen,
  Users,
  RefreshCw
} from 'lucide-react';
import { blogs, BlogPost } from '../data';
import { InternalPageHero } from '../components/InternalPageHero';

export function Blogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const blogCards = [
    { icon: BookOpen, value: '100+ Articles', label: 'Engineering Insights' },
    { icon: Users, value: '50k+ Readers', label: 'Industry Community' },
    { icon: RefreshCw, value: 'Weekly', label: 'Updates & Publications' }
  ];

  // Track scroll position to trigger parallax if needed
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const scroller = document.getElementById('app-scroller');
    if (!scroller) return;
    const handleScroll = () => setScrollY(scroller.scrollTop);
    scroller.addEventListener('scroll', handleScroll);
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  // Get unique list of categories from blog posts
  const categories = ['All', ...Array.from(new Set(blogs.map(post => post.category)))];

  // Filter posts based on search query and category
  const filteredBlogs = blogs.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination details
  const totalPosts = filteredBlogs.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  // Ensure we are not on an out-of-bounds page if filters changed
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll smoothly to start of articles section
    const articlesSection = document.getElementById('latest-articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate pagination items with ellipses
  const renderPaginationRange = () => {
    const range: (number | string)[] = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= maxVisiblePages) {
        for (let i = 1; i <= 4; i++) range.push(i);
        range.push('...');
        range.push(totalPages);
      } else if (currentPage > totalPages - maxVisiblePages) {
        range.push(1);
        range.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) range.push(i);
      } else {
        range.push(1);
        range.push('...');
        range.push(currentPage - 1);
        range.push(currentPage);
        range.push(currentPage + 1);
        range.push('...');
        range.push(totalPages);
      }
    }
    return range;
  };

  return (
    <div className="bg-white min-h-screen pb-24 selection:bg-[#EA8A22] selection:text-white">
      
      {/* 1. HERO HEADER */}
      <InternalPageHero
        title={<>Engineering <br /> <span className="text-[#EA8A22]">Insights</span></>}
        categoryBadge="Our Blogs"
        categoryIcon={BookOpen}
        description=""
        heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
        cards={blogCards}
      />

      {/* 2. MAIN ARTICLES CONTENT AREA */}
      <section id="latest-articles" className="py-12 md:py-20 lg:py-24 bg-transparent relative">
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 lg:px-7 xl:px-8">

          {/* 3. BLOG GRID / LISTS WITH viewport reveal */}
          <AnimatePresence mode="wait">
            {currentPosts.length > 0 ? (
              <motion.div 
                key={`${selectedCategory}-${searchQuery}-${currentPage}`}
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08
                    }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
              >
                {currentPosts.map((post) => (
                                    <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="group bg-white border border-neutral-200 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-[#EA8A22]/5 hover:border-[#EA8A22]/40 transition-all duration-500 flex flex-col h-full block"
                    >
                      {/* Image zoom on hover */}
                      <div className="h-56 md:h-64 overflow-hidden relative block shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                          referrerPolicy="no-referrer"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#EA8A22]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Blog Card Core Body Details */}
                      <div className="p-6 flex-1 flex flex-col justify-start space-y-3">
                        <div className="flex items-center text-[10px] font-mono text-neutral-400 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.date}</span>
                          </div>
                        </div>

                        {/* Title - Max 2 lines */}
                        <h3 className="text-base md:text-lg font-bold text-neutral-900 transition-colors tracking-tight line-clamp-2 uppercase group-hover:text-[#EA8A22]">
                          {post.title}
                        </h3>

                        {/* Description - Max 1 line */}
                        <p className="text-xs md:text-[13px] text-neutral-500 leading-relaxed font-light line-clamp-1">
                          {post.desc}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* 4. EMPTY STATE - Elegant construction style */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-md mx-auto text-center py-20 px-6 border border-neutral-150 rounded-[2.5rem] bg-neutral-50/50 shadow-md flex flex-col items-center space-y-6"
              >
                <div className="w-16 h-16 bg-[#EA8A22] rounded-full flex items-center justify-center text-[#EA8A22] shadow-inner">
                  <Inbox className="w-7 h-7 stroke-[1.5]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-neutral-900 uppercase tracking-tight">
                    No Articles Available Yet
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    We're preparing valuable engineering insights and industry updates. Please check back soon or try broadening your filters.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-5 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    Reset Filters
                  </button>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-[#EA8A22] hover:bg-[#EA8A22] text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#EA8A22]/10 transition-all active:scale-95"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5. PAGINATION PANEL (centered beneath articles list) */}
          {totalPages > 1 && (
            <div className="mt-20 flex justify-center">
              <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-neutral-200 shadow-sm w-fit">
                {/* Previous button */}
                <button
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-neutral-600 transition-all cursor-pointer"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Number links with ellipses */}
                {renderPaginationRange().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span 
                        key={`ellipsis-${index}`} 
                        className="w-9 h-9 flex items-center justify-center text-neutral-400 font-mono text-xs"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={`page-${page}`}
                      onClick={() => paginate(Number(page))}
                      className={`w-9 h-9 flex items-center justify-center rounded-full font-mono font-bold text-xs transition-all ${
                        currentPage === page
                          ? 'bg-[#EA8A22] text-white shadow-sm'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 cursor-pointer'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next button */}
                <button
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-neutral-600 transition-all cursor-pointer"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
