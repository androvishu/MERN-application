import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import PersonInfoForm from './components/PersonInfoForm';
import DisplayInfo from './components/DisplayInfo';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PersonInfoForm />} />
          <Route path="/display" element={<DisplayInfo />} />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
