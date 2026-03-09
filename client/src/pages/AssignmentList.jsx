import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await api.get('/api/assignments');
                setAssignments(res.data);
            } catch (err) {
                console.error('Failed to fetch assignments:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAssignments();
    }, []);

    if (loading) return <div className="loading">Loading assignments...</div>;

    return (
        <div className="assignment-list container">
            <header className="assignment-list__header">
                <h1>SQL Assignments</h1>
                <p>Master SQL by solving real-world challenges</p>
            </header>
            <div className="assignment-list__grid">
                {assignments.map((assignment) => (
                    <div key={assignment._id} className="assignment-card">
                        <div className={`assignment-card__badge assignment-card__badge--${assignment.description.toLowerCase()}`}>
                            {assignment.description}
                        </div>
                        <h3 className="assignment-card__title">{assignment.title}</h3>
                        <p className="assignment-card__question">{assignment.question}</p>
                        <Link to={`/assignment/${assignment._id}`} className="button button--primary">
                            Attempt Assignment
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentList;
