import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import "./components/Home.css"

const App = () => {
  const [filePath, setFilePath] = useState('');

  return (
    <div>
      {/* <Navbar></Navbar>
      <FileUpload onFileSubmitted={setFilePath} />
       */}

      <Home></Home>

    </div>
  );
};

export default App;
