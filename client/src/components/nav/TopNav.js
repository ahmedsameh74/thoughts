import React from 'react'
import { motion } from "framer-motion";
import './Nav.css'

export default function TopNav({handleNav}) {
  return (
    <nav>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="material-symbols-outlined menu"
        onClick={handleNav}
      >
        menu
      </motion.span>
    </nav>
  );
}
