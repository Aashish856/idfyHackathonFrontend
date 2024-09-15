import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plots from './Plots';
import PiiPieChart from './PiiPieChart';
import RiskScore from './RiskScore';

const SQL = () => {
    const [host, setHost] = useState('');
    const [root, setRoot] = useState('');
    const [password, setPassword] = useState('');
    const [database, setDatabase] = useState('');
    const [loading, setLoading] = useState(false);
    const [outPath, setOutPath] = useState('');
    const [verdict, setVerdict] = useState('');
    const [showResultsButton, setShowResultsButton] = useState(false);
    const [entities, setEntities] = useState([]);
    const [timer, setTimer] = useState(0);

    const handleSubmit = async () => {
        if (!host || !root || !password || !database) return;
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3001/detectPII/sql", { host, root, password, database });
            const { out_path, msg } = response.data;
            
            setTimer(0);
            setEntities([]);
            setOutPath(out_path);
            setShowResultsButton(true);
            setVerdict("Starting");
            setEntities([]);
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
            const response = await axios.get(`http://localhost:3001/results/${outPath}`);
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
        const intervalId = setInterval(() => {
            if (verdict !== "Processed" && verdict !== "") {
                setTimer(prevTimer => prevTimer + 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [verdict]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (verdict !== "Processed") {
                handleViewResults();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [outPath]);

    return (
        <>
            <section>
                <div className='d-flex p-3 justify-content-around' style={{ width: "100%", borderRadius: "10px" }}>
                    <div style={{ width: "20%" }}>
                        <input type="text" placeholder="Host" value={host} onChange={(e) => setHost(e.target.value)} className="form-control" />
                    </div>
                    <div style={{ width: "20%" }}>
                        <input type="text" placeholder="Root" value={root} onChange={(e) => setRoot(e.target.value)} className="form-control" />
                    </div>
                    <div style={{ width: "20%" }}>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                    </div>
                    <div style={{ width: "20%" }}>
                        <input type="text" placeholder="Database" value={database} onChange={(e) => setDatabase(e.target.value)} className="form-control" />
                    </div>
                    <div className='d-flex justify-content-start' style={{ width: "10%" }}>
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
                    <div className='d-flex px-3 py-2 mb-4 justify-content-around mb-3 align-items-center' style={{ width: "100%", color: "white", backgroundColor: "#213743", borderRadius: "10px" }}>
                        <div className='d-flex justify-content-between'>
                            <p className='fs-4 fw-bold my-auto'>Verdict: </p>
                            <p className='fs-4 ms-3 my-auto'>{verdict}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='fs-4 fw-bold my-auto'>Risk Score: </p>
                            <p className='fs-4 ms-3 my-auto'><RiskScore entities={entities} /></p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='fs-4 fw-bold my-auto'>Total Entities: </p>
                            <p className='fs-4 ms-3 my-auto'>{entities.length}</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p className='fs-4 fw-bold my-auto'>Time Taken: </p>
                            <p className='fs-4 ms-3 my-auto'>{timer} seconds</p>
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        {entities.length > 0 ?
                            <section className='d-flex'>
                                <div style={{ width: "60%" }}>
                                    <Plots entities={entities} />
                                </div>
                                <div style={{ width: "40%" }}>
                                    <PiiPieChart entities={entities} />
                                </div>
                            </section>
                            : ""}
                    </div>
                </div>
            </section>
        </>
    )
};

export default SQL;
