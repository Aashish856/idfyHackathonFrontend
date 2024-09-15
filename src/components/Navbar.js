// src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return(
    <>
        <section className=" py-4 border-bottom">
        <div className='container'>
          <div className='d-flex justify-content-center align-items-center'>
            <p style={{color : "white"}} className='fs-3 fw-bold mb-0'>Personally Identifiable Information Detection Pipeline</p>
          </div>
        </div>
      </section>
    </>
  )
};

export default Navbar;
