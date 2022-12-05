import './Nav.css';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import {useLogout} from "../../hooks/useLogout";
import { useProfileContext } from '../../hooks/useProfileContext';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import TopNav from './TopNav';
import { motion } from "framer-motion";

const Nav = ({showNav, setShowNav}) => {
  const {user} = useAuthContext();
  const {logout} = useLogout();
  const {profile} = useProfileContext()
  const [active, setActive] = useState(null);
  // const [showNav, setShowNav] = useState(false);
  const sideNav = useRef()
  const [intial, setInitial] = useState('0')
  const [animate, setAnimate] = useState('40%')

  const handleActive = (index) => {
    setActive(index);
  }

  const handleNav = () => {
    setShowNav(!showNav);
  }

  // useEffect(() => {
  //   if(!showNav) {
  //     setInitial('0')
  //     setAnimate('40%')
  //   } else {
  //     setInitial('40%')
  //     setAnimate('0')
  //   }
  // }, [showNav])

  // useEffect(() => {
  //   if(!showNav) {
  //     setInitial('40%')
  //     setAnimate('0')
  //   }
  //   console.log(intial, animate, showNav)
  // }, [showNav, intial, animate])
  
  // console.log(profile)
  // console.log(user)
  
    return (
      <>
        {!showNav && <TopNav handleNav={handleNav} />}
        {/* {showNav && ( */}
        <motion.div
          initial={{
            flex: showNav ? 0 : 1,
            display: showNav ? "none" : "flex",
          }}
          animate={{
            flex: showNav ? 1 : 0,
            display: showNav ? "flex" : "none",
          }}
          // transition={{duration: showNav ? 0 : 0.5}}
          className="sideNav"
          ref={sideNav}
        >
          <motion.span
            initial={{ display: showNav ? "none" : "flex" }}
            animate={{ display: showNav ? "flex" : "none" }}
            // transition={{ duration: 0.5 }}
            className="material-symbols-outlined cancel"
            onClick={() => setShowNav(false)}
          >
            cancel
          </motion.span>
          <Link className="nav-head" to="/" onClick={() => handleActive(null)}>
            <motion.h2
              initial={{ display: showNav ? "none" : "block" }}
              animate={{ display: showNav ? "block" : "none" }}
              // transition={{  duration: 0.5 }}
            >
              Thoughts
            </motion.h2>
          </Link>
          <hr />
          {user && (
            <motion.div
              initial={{ display: showNav ? "none" : "flex" }}
              animate={{ display: showNav ? "flex" : "none" }}
              // transition={{  duration: 0.5 }}
              className="navItemLink"
            >
              <Link
                className={active === 1 ? "navLink active" : "navLink"}
                to={`/profile/${profile && profile.userName}`}
                onClick={() => handleActive(1)}
              >
                {user.firstName}
              </Link>
              <Link
                className={active === 2 ? "navLink active" : "navLink"}
                to="/create"
                onClick={() => handleActive(2)}
              >
                Create
              </Link>
              <Link
                className={active === 3 ? "navLink active" : "navLink"}
                to="/profilesetting"
                onClick={() => handleActive(3)}
              >
                Setting
              </Link>
              <span className="navLink" onClick={logout}>
                Logout
              </span>
            </motion.div>
          )}
        </motion.div>
        {/* )} */}
      </>
    );
}
 
export default Nav;