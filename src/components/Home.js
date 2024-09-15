import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import "./Home.css"
import CustomData from './CustomData';
import SQL from './SQL';
import AWS_S3_Bucket from './AWS_S3_Bucket';
import GoogleDriveStorage from './GoogleDriveStorage';

const Home = () => {
  const [selectedStream, setSelectedStream] = useState("Custom Data");

  const handleStreamChange = (stream) => {
    setSelectedStream(stream);
  };

  return (
    <>
      <div>
        <div style={{ backgroundColor: "#0F212E", height: "100vh" }} className='d-flex'>
          <div style={{ width: "20%" }} className='p-2'>
            <div className='d-flex flex-column align-items-between justify-content-between py-3' style={{ backgroundColor: "#1A2C38", height: "100%", width: "100%", borderRadius: "10px" }}>
              <section>
                <div className='d-flex flex-column align-items-center'>
                  <p className='mt-3 fs-4 fw-bold' style={{ color: "white" }}>IdFy Hackathon</p>
                </div>
              </section>
              <section>
                <div style={{ color: "white" }} className='d-flex flex-column align-items-center justify-content-start'>
                  <p className='fw-bold'>Choose Data Stream</p>
                  <p className='clickable-text' onClick={() => handleStreamChange("Custom Data")}>Custom Data</p>
                  <p className='clickable-text' onClick={() => handleStreamChange("AWS S3 Bucket")}>AWS S3 Bucket</p>
                  <p className='clickable-text' onClick={() => handleStreamChange("Google Drive Storage")}>Google Drive Storage</p>
                  <p className='clickable-text' onClick={() => handleStreamChange("SQL")}>MySql Database</p>
                </div>
              </section>

              <section>
                <div style={{ color: "white" }} className='d-flex flex-column align-items-center'>
                  <p style={{ marginBottom: "3px" }}>Aashish Aggarwal (IIT Delhi)</p>
                  <p>Team Name - ch7200151</p>
                </div>
              </section>
            </div>
          </div>
          <div style={{ width: "80%" }}>
            <section>
              <Navbar></Navbar>
            </section>
            <section>
              {selectedStream === "Custom Data" ? <CustomData /> : 
              selectedStream === "SQL" ? <SQL /> :
              selectedStream === "AWS S3 Bucket" ? <AWS_S3_Bucket /> : 
              selectedStream === "Google Drive Storage" ? <GoogleDriveStorage /> : ""}
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
