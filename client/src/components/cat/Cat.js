import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Cat.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export default function Cat() {
    const [cat, setCat] = useState([])
      const settings = {
      className: "center",
      infinite: true,
      centerPadding: "20px",
      slidesToShow: 1,
      swipeToSlide: true,
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }}

    useEffect(() => {
        const fetchCat = async () => {
            const res = await fetch("/api/cats/cat/all", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setCat(data)
            }
        }
        fetchCat()
    },[])
    
  return (
    <div className="post-topic-cat">
    <Slider {...settings}>
      {cat &&
        cat.map((cat) => (
          <Link
            className="post-cat-btn"
            to={`/category/${cat}`}
            key={Math.random(100000)}
          >
            {cat}
          </Link>
        ))}
    </Slider>
    </div>
  );
}
