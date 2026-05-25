import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

export default function NotFound() {
  // Inject SEO metadata for 404 page
  useSEO({
    meta_title: "Page Not Found | IPS Academy Indore",
    meta_description: "The page you are looking for does not exist. Return to the IPS Academy Indore home page to explore our programs and campus.",
    canonical_url: "https://ipsacademyindore.edu.in/404"
  });

  return (
    <div className="min-h-screen bg-[#00142D] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0CC2FE]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#002147]/50 rounded-full blur-3xl -z-10" />

      <div className="text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold tracking-wider text-[#0CC2FE] uppercase">Error 404</span>
          <h1 className="mt-2 text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Page Not Found
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/ipsa/home"
            className="w-full sm:w-auto bg-[#0CC2FE] hover:bg-[#00a3da] text-white font-medium px-8 py-3 rounded-md transition duration-300 shadow-lg shadow-[#0CC2FE]/20"
          >
            Go back Home
          </Link>
          <Link
            to="/ipsa/contact"
            className="w-full sm:w-auto border border-gray-400 hover:border-white hover:bg-white/5 text-white font-medium px-8 py-3 rounded-md transition duration-300"
          >
            Contact Support
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">Popular Campuses</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-300">
            <Link to="/ipsa/home" className="hover:text-[#0CC2FE] transition-colors">IPSA Main</Link>
            <Link to="/ibmr/home" className="hover:text-[#0CC2FE] transition-colors">IBMR (Management)</Link>
            <Link to="/coe/home" className="hover:text-[#0CC2FE] transition-colors">Engineering</Link>
            <Link to="/isr/home" className="hover:text-[#0CC2FE] transition-colors">Research</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
