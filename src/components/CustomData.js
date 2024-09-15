// src/components/FileUpload.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plots from './Plots';
import PiiPieChart from './PiiPieChart';
import RiskScore from './RiskScore';

const CustomData = () => {
    const [filePath, setFilePath] = useState('');
    const [dataType, setDataType] = useState('structured');
    const [loading, setLoading] = useState(false);
    const [outPath, setOutPath] = useState('');
    const [verdict, setVerdict] = useState('');
    const [showResultsButton, setShowResultsButton] = useState(false);
    const [entities, setEntities] = useState([]);
    const [timer, setTimer] = useState(0);

    const handleSubmit = async () => {
        if (!filePath) return;
        setLoading(true);
        setTimer(0);
        setEntities([])
        try {
            const response = await axios.post("http://localhost:3000/detectPII", { filePath, dataType });
            const { out_path, msg } = response.data;

            setOutPath(out_path);
            setShowResultsButton(true);
            setVerdict("Starting");
            setEntities([])
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleViewResults = async () => {
        if (!outPath) {
            setVerdict("");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/results/${outPath}`);
            const { verdict, entities } = response.data;
            setVerdict(verdict);
            if (verdict === "Processed") {
                setEntities(entities);
            }
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };
    useEffect(() => {
        // Set up interval
        const intervalId = setInterval(() => {
          if (verdict !== "Processed" && verdict !== "") {
            setTimer(prevTimer => prevTimer + 1); // Use functional update to avoid issues with stale state
          }
        }, 1000); // Adjust the interval time (1000ms = 1 second)
    
        // Clear interval on component unmount or when dependencies change
        return () => clearInterval(intervalId);
      }); // Add `verdict` to dependencies array
    

    useEffect(() => {
        const interval = setInterval(() => {
            if (verdict != "Processed") {
                handleViewResults();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [outPath]);

    return (
        <>
            <section>
                <div className='d-flex p-3 justify-content-around' style={{ width: "100%", borderRadius: "10px" }}>
                    <div style={{ width: "30%" }}>
                        <input type="text" placeholder="File Path" value={filePath} onChange={(e) => setFilePath(e.target.value)} className="form-control" />
                    </div>
                    <div style={{width : "30%"}}>
                        <select value={dataType} onChange={(e) => setDataType(e.target.value)} className="form-select">
                            <option value="structured">Structured</option>
                            <option value="semi-structured">Semi-structured</option>
                            <option value="unstructured">Unstructured</option>
                        </select>
                    </div>
                    <div className='d-flex justify-content-start' style={{width :"10%"}}>
                        <div>
                            <button onClick={handleSubmit} disabled={loading} className="btn btn-success w-100">
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='mt-5 pe-2'>
                <div className='d-flex flex-column align-items-start'>
                    <div className='d-flex px-3 py-2 mb-4 justify-content-around mb-3 align-items-center' style={{width : "100%", color: "white", backgroundColor : "#213743", borderRadius : "10px"}}>
                        <div className='d-flex justify-content-between'>
                            <p style={{marginBottom : "0"}} className='fs-4 fw-bold my-auto'>Verdict : </p>
                            <p style={{marginBottom : "0"}} className='fs-4 ms-3 my-auto'>{verdict}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p style={{marginBottom : "0"}} className='fs-4 fw-bold my-auto'>Risk Score : </p>
                            <p style={{marginBottom : "0"}} className='fs-4 ms-3 my-auto'><RiskScore entities={entities}/></p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p style={{marginBottom : "0"}} className='fs-4 fw-bold my-auto'>Total Entities : </p>
                            <p style={{marginBottom : "0"}} className='fs-4 ms-3 my-auto'>{entities.length}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p style={{marginBottom : "0"}} className='fs-4 fw-bold my-auto'>Time Taken : </p>
                            <p style={{marginBottom : "0"}} className='fs-4 ms-3 my-auto'>{timer} seconds</p>
                        </div>
                    </div>
                    <div style={{width : "100%"}}>

                    {entities.length > 0 ?
                        <section className='d-flex'>
                            <div style={{width: "60%"}}>

                                <Plots entities={entities} />
                            </div>
                            <div style={{width : "40%"}}>
                                <PiiPieChart entities={entities} /> 
                            </div>
                        </section> : ""
                    } 
                    </div>
                </div>
            </section>
        </>
    )
};

export default CustomData;
