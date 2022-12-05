import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'
import { useRef } from 'react';
// import {motion}
import { motion } from 'framer-motion';

export default function Search() {
    const [search, setSearch] = useState('')
    const [cat, setCat] = useState([])
    const [searched, setSearched] = useState([])
    const [searchBar, setSearchBar] = useState(false)
    const searchClass = useRef()

    const handleShowSearch = () => {
        setSearchBar(searchBar => !searchBar)
    }

    useEffect(() => {
        if(searchBar) {
            searchClass.current.focus()
            searchClass.current.style.cssText =
              "width: 70%;padding: 0 1rem;border: 1px solid #ccc;border-radius: 5px;font-size: 1.5rem;font-weight: 600;outline: none;";
        }
    })

    const handleSearch = (e) => {
        setSearch(e.target.value)
        // console.log(e.target.value.length)
        // setCat(null)
        // setSearched(null)
        if(e.target.value.length > 0) {
            const searchedCat = cat.filter(cat => cat.toLowerCase().includes(e.target.value.toLowerCase()))
            setSearched(searchedCat)
        }else {
            setSearched([])
        }
    }

    useEffect(() => {
        const getAllCat = async () => {
            const fetchCats = await fetch(`/api/cats/cat/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await fetchCats.json()
            // console.log(data)
            setCat(data)
            // console.log(searched)
        }
        getAllCat()
    }, [search])


  return (
    <div>
      <form className="search">
        <label>
          <span className="material-symbols-outlined search-icon"
          onClick={handleShowSearch}
          >search</span>
          {searchBar &&( <motion.input
            initial={{x: -100}}
            animate={{x: 0}}
            type="text"
            onKeyUp={handleSearch}
            placeholder="Search"
            ref={searchClass}
            //    onChange={handleSearch}
          />)}
        </label>
        <div className="result">
          {searched &&
            searched.map((cat, i) => (
              <Link to={`/category/${cat}`} key={i}>
                {cat}
              </Link>
            ))}
        </div>
      </form>
    </div>
  );
}
