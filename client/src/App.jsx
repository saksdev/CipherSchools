import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssignmentList from './pages/AssignmentList';
import AssignmentWorkspace from './pages/AssignmentWorkspace';
import './styles/main.scss';

function App() {
    return (
        <Router>
            <div className="app">
                <nav className="navbar">
                    <div className="container">
                        <span className="navbar__logo">CipherSQLStudio</span>
                    </div>
                </nav>
                <main className="content">
                    <Routes>
                        <Route path="/" element={<AssignmentList />} />
                        <Route path="/assignment/:id" element={<AssignmentWorkspace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
