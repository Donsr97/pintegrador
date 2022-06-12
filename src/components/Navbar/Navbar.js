import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import { NavLink } from "react-router-dom";
import { Link, withRouter } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import "./Navbar.css";

function Navbar(){
    const navigate = useNavigate();

    function logOut (e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        navigate('/login');
        window.location.reload()
    }


          const loginRegLink = (
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link to="/login" className="nav-link">
                          Login
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link to="/register" className="nav-link">
                          Register
                      </Link>
                  </li>
              </ul>
          )

          const userLink = (
            <div>

            <ul className="navbar-nav">
            <li className="nav-item">
            <Link to="/view" className="btn btn-outline-info my-2 my-sm-0">
                Ver tus historias
            </Link>
            </li>
                <li className="nav-item">
                    <Link to="/newstory" className="nav-link">
                        Nueva historia
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/login" onClick={logOut} className="nav-link">
                        Cerrar Sesión
                    </Link>
                </li>
            </ul>

            </div>
          )



      return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar1"
                aria-controls="navbar1"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-md-right"
                id="navbar1">
                <ul className="navbar-nav">
                    <li className="nav-item">

                    </li>
                </ul>
              {localStorage.usertoken ? userLink : loginRegLink}
            </div>
        </nav>

      )

  }

export default Navbar;
