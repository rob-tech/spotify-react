import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import image from "../Assets/Spotify_Logo.png";


export const SideBar = () =>{
  
    return (
        <>
      <Menu>
        <img src={image} className = "logo" width="150px" height="55px" />
        <a className="menu-item" href="#">
          Home
        </a>

        <a className="menu-item" href="#">
          Laravel
        </a>

        <a className="menu-item" href="#">
          Angular
        </a>

        <a className="menu-item" href="#">
          React
        </a>

        <a className="menu-item" href="#">
          Vue
        </a>

        <a className="menu-item" href="#">
          Node
        </a>

        <div className="d-flex flex-column align-items-center" id="accountProfile">
          <button type="button" className="bt-styleOne btn-lg">
            SIGN UP
          </button>

          <button type="button" className="bt-styleTwo btn-lg">
            LOG IN
          </button>

          <a href="#" className="privacy">
            Cookie | Privacy Policy
          </a>
        </div>
      </Menu>
      </>
    );
  }
